import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import { PaymentController } from './app/modules/payment/payment.controller';
import cron from 'node-cron';
import { AppointmentService } from './app/modules/appointment/appointment.service';
import { format } from 'date-fns';

const app: Application = express();

app.post('/stripe-webhook', express.raw({ type: 'application/json' }), PaymentController.handleStripeWebhookEvent);
// we can also do like this, adding the stripe server into the cors allow list, but it is not recommended as it can be a security risk.

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// cron.schedule('* * * * *', () => {
//     try {
//         console.log("Node cron called at ", new Date());
//         AppointmentService.cancelUnpaidAppointments();
//     } catch (err) {
//         console.error(err);
//     }
// });

// Best practice for corn job.
cron.schedule('* * * * *', async () => {
    try {
        if(process.env.NODE_ENV === "development") {
            console.log("Running appointment cancellation cron at", format(new Date(), 'yyyy-MM-dd HH:mm:ss'));
        }
        await AppointmentService.cancelUnpaidAppointments();
    } catch (err) {
        console.error("Failed to cancel unpaid appointments:", err);
        // Optionally: send alert/notification to monitoring service/admin about the failure
    }
});

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server.."
    })
});


app.use(globalErrorHandler);

app.use(notFound);

export default app;