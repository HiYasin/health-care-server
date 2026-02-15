# Setting Up Stripe Local Listener for Webhooks

## Overview

The Stripe CLI provides a secure way to listen for webhook events on your local development machine without needing external tunneling services like ngrok. This guide walks you through setting up and configuring Stripe webhooks for local testing and development.

## Prerequisites

- **Stripe Account**: You need an active Stripe account at [stripe.com](https://stripe.com)
- **Stripe CLI**: Download and install from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
- **Local Development Server**: Your application running on localhost (e.g., localhost:3000)

## Step 1: Install Stripe CLI

### On Windows

1. Download the Stripe CLI installer for Windows from the [official Stripe CLI page](https://stripe.com/docs/stripe-cli)
2. Run the installer and follow the setup wizard
3. Verify installation by opening Command Prompt or PowerShell and running:

```bash
stripe --version
```

### On macOS

```bash
brew install stripe/stripe-cli/stripe
```

### On Linux

```bash
# Using apt (Ubuntu/Debian)
sudo apt-get install stripe

# Or using the installation script
curl https://files.stripe.com/stripe-cli/install.sh -O
bash install.sh
```

## Step 2: Authenticate with Stripe

Before you can listen for events, you need to authenticate with your Stripe account.

### Interactive Login (Recommended)

```bash
stripe login
```

This will open your browser for OAuth-based authentication. Grant permission to the Stripe CLI to access your account.

### Terminal-Based Login

If the browser-based login doesn't work:

```bash
stripe login --interactive
```

### Logout

To logout from your Stripe account:

```bash
stripe logout
```

## Step 3: Start Your Local Server

Ensure your development server is running on your desired port. For example, if your webhook endpoint is at `http://localhost:3000/webhooks`:

```bash
npm run dev
# or
yarn dev
# or your server startup command
```

Your webhook endpoint should be configured to receive POST requests and handle webhook payloads.

## Step 4: Start Listening for Webhooks

### Basic Setup - Listen to All Events

Forward all webhook events to your local endpoint:

```bash
stripe listen --forward-to localhost:3000/webhooks
```

The CLI will output something like:

```
Ready! Your webhook signing secret is 'whsec_test_xxxxxxxxxxxxxxxxxxxx' (^C to quit)
```

Copy the webhook signing secret and add it to your `.env` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxxxxxxxxx
```

### Listen to Specific Events

Filter to only specific events you're interested in:

```bash
stripe listen --events charge.succeeded,charge.failed,payment_intent.succeeded
```

### Listen with Full URL

Include the full HTTP URL if needed:

```bash
stripe listen --forward-to http://localhost:3000/webhooks
```

### Additional Options

```bash
# Skip HTTPS certificate verification
stripe listen --forward-to localhost:3000/webhooks --skip-verify

# Use live mode (test with live events)
stripe listen --forward-to localhost:3000/webhooks --live

# Add custom headers to webhook requests
stripe listen --forward-to localhost:3000/webhooks --headers "Authorization: Bearer token"

# Print the webhook signing secret
stripe listen --forward-to localhost:3000/webhooks --print-secret

# Listen for thin events (smaller payloads)
stripe listen --thin-events v1.billing.meter.no_meter_found --forward-to localhost:3000/webhooks
```

## Step 5: Handle Webhook Signatures in Your Application

### Node.js/Express Example

```typescript
import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const app = express();

// Raw body is required for signature verification
app.post(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err}`);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle different event types
    switch (event.type) {
      case 'charge.succeeded':
        const chargeSucceeded = event.data.object as Stripe.Charge;
        console.log(`Charge succeeded: ${chargeSucceeded.id}`);
        break;

      case 'charge.failed':
        const chargeFailed = event.data.object as Stripe.Charge;
        console.log(`Charge failed: ${chargeFailed.id}`);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`Payment intent succeeded: ${paymentIntent.id}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

app.listen(3000, () => {
  console.log('Webhook server is running on port 3000');
});
```

## Step 6: Monitor Webhook Activity

### View Webhook Logs in Terminal

The Stripe CLI displays real-time webhook activity in your terminal:

```
2024-02-15 10:30:45  --> charge.succeeded [evt_xxxxx]
2024-02-15 10:30:45  <-- [200] sent successfully
```

### Check Response Status

The CLI shows whether your endpoint responded with a successful status code (2xx) or encountered an error.

## Testing Webhooks Manually

Create test events from the Stripe Dashboard or using the Stripe CLI:

```bash
# Trigger a test charge.succeeded event
stripe trigger charge.succeeded

# Create a test payment intent
stripe trigger payment_intent.succeeded
```

## Troubleshooting

### Issue: "webhook signing secret" not shown

**Solution**: Make sure you're including the `--forward-to` flag:

```bash
stripe listen --forward-to localhost:3000/webhooks
```

### Issue: Webhook events not being received

**Check**:
1. Your local server is running and accessible
2. The port and path in `--forward-to` match your webhook endpoint
3. Your Stripe CLI is authenticated (run `stripe login`)
4. Your endpoint is returning a 200 status code

### Issue: "Connection refused" error

**Solution**: Verify your server is running:

```bash
# Check if port is in use
netstat -ano | findstr :3000  # Windows
lsof -i :3000                # macOS/Linux
```

### Issue: HTTPS Certificate verification failure

Use the `--skip-verify` flag if testing locally without HTTPS:

```bash
stripe listen --forward-to localhost:3000/webhooks --skip-verify
```

## Environment Configuration

Create a `.env` file in your project root with:

```env
# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx

# Webhook Signing Secret (from stripe listen command output)
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxxxxxxxxx
```

## Production Considerations

### For Live Webhook Endpoints

Once you're ready for production:

1. Configure webhooks in the Stripe Dashboard:
   - Go to Developers > Webhooks
   - Add your production endpoint URL
   - Select events to listen for

2. Use your live Stripe API keys (starting with `sk_live_`)

3. Whitelist IP addresses if needed for security

### Use Different Endpoints for Dev/Prod

```env
# Development
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxxxxxxxxx

# Production (set via dashboard or environment variables)
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxxxxxxxxxxxxxxxxx
```

## Best Practices

✅ **Do**:
- Always verify webhook signatures before processing
- Use different signing secrets for test and live modes
- Log webhook events for debugging and auditing
- Test with various event types before going live
- Keep both Stripe CLI and SDKs updated

❌ **Don't**:
- Hardcode webhook secrets in version control
- Process webhooks without signature verification
- Ignore webhook delivery failures
- Use test credentials in production
- Expose your signing secret in logs or error messages

## Useful Resources

- [Stripe Webhooks Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Webhook Event Reference](https://stripe.com/docs/api/events)
- [Testing Webhooks Guide](https://stripe.com/docs/webhooks/test)

## Summary

Setting up Stripe local webhook listener involves:

1. Installing and authenticating the Stripe CLI
2. Running your local development server
3. Using `stripe listen --forward-to` to establish the tunnel
4. Adding the webhook signing secret to your environment
5. Implementing signature verification in your webhook handler
6. Testing different event types before deployment

With these steps, you can safely develop and test Stripe webhook integrations locally without exposing your development machine to the public internet.
