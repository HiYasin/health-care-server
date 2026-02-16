import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

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
    emailSender: {
        emailHost: process.env.EMAIL_HOST,
        email: process.env.EMAIL_SENDER_MAIL,
        app_pass: process.env.EMAIL_SENDER_APP_PASSWORD
    },
    jwt: {
        jwt_secret: process.env.JWT_SECRET as Secret,
        expires_in: process.env.JWT_EXPIRES_IN as string,
        refresh_token_secret: process.env.JWT_REFRESH_SECRET as Secret,
        access_token_secret: process.env.JWT_ACCESS_SECRET as Secret,
        reset_pass_secret: process.env.JWT_RESET_PASS_SECRET as string,
        access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
        refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
        reset_pass_token_expires_in: process.env.JWT_RESET_PASS_TOKEN_EXPIRES_IN as string,
    },
    reset_pass_link: process.env.RESET_PASS_LINK
}