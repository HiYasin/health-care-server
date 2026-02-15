import dotenv from 'dotenv';
import path from 'path';
import { stripe } from '../app/helper/stripe';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    salt_rounds: Number(process.env.SALT_ROUNDS),
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    paymentSuccessUrl: process.env.PAYMENT_SUCCESS_URL,
    paymentFailureUrl: process.env.PAYMENT_FAILURE_URL,
    paymentCancelUrl: process.env.PAYMENT_CANCEL_URL,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}