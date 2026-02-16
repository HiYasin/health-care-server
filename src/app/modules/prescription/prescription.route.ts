import express from 'express';
import { PrescriptionController } from './prescription.controller';
import checkAuth from '../../middlewares/checkAuth';
import { UserRole } from '../../../generated/prisma';
const router = express.Router();

router.get(
    '/my-prescription',
    checkAuth(UserRole.PATIENT),
    PrescriptionController.patientPrescription
)

router.post(
    "/",
    checkAuth(UserRole.DOCTOR),
    PrescriptionController.createPrescription
);

export const PrescriptionRoutes = router;