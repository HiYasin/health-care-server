// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }), // important for signature verification
//   stripeWebhookHandler
// );

// This route will handle Stripe webhook events, such as successful payments, refunds, etc.
// But it will not work due to cors-origin. So we will handle the webhook route before the cors middleware in the main app.ts file.