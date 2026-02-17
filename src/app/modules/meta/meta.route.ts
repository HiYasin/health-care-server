import express from 'express';
import { MetaController } from './meta.controller';
import checkAuth from '../../middlewares/checkAuth';
import { UserRole } from '../../../generated/prisma';

const router = express.Router();

router.get(
    '/',
    checkAuth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    MetaController.fetchDashboardMetaData
)

export const metaRoutes = router;