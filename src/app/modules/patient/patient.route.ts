import express from 'express';
import { PatientController } from './patient.controller';
import checkAuth from '../../middlewares/checkAuth';
import { UserRole } from '../../../generated/prisma';

const router = express.Router();

router.get(
    '/',
    checkAuth(UserRole.ADMIN),
    PatientController.getAllFromDB
);

router.get(
    '/:id',
    checkAuth(UserRole.ADMIN, UserRole.PATIENT),
    PatientController.getByIdFromDB
);

router.delete(
    '/soft/:id',
    checkAuth(UserRole.ADMIN),
    PatientController.softDelete
);

export const PatientRoutes = router;