import express from 'express'
import { ReviewController } from './review.controller';
import checkAuth from '../../middlewares/checkAuth';
import { UserRole } from '../../../generated/prisma';

const router = express.Router();

router.post(
    '/',
    checkAuth(UserRole.PATIENT),
    ReviewController.insertIntoDB
);


export const ReviewRoutes = router;