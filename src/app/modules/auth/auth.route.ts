import express from 'express'
import { AuthController } from './auth.controller';
import { UserRole } from '../../../generated/prisma';
import checkAuth from '../../middlewares/checkAuth';


const router = express.Router();

router.post(
    "/login",
    AuthController.login
);

router.get(
    "/me",
    AuthController.getMe
);

router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post(
    '/change-password',
    checkAuth(
        UserRole.ADMIN,
        UserRole.DOCTOR,
        UserRole.PATIENT
    ),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    AuthController.forgotPassword
);

router.post(
    '/reset-password',
    AuthController.resetPassword
);

export const authRoutes = router;