import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../helper/fileUploader';
import { SpecialtiesController } from './specialities.controller';
import { SpecialtiesValidtaion } from './specialities.validation';
import { UserRole } from '../../../generated/prisma';
import checkAuth from '../../middlewares/checkAuth';
import { validateRequest } from '../../middlewares/validateRequest';


const router = express.Router();

router.get(
    '/',
    SpecialtiesController.getAllFromDB
);

router.post(
    '/',
    checkAuth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    validateRequest(SpecialtiesValidtaion.create),
    SpecialtiesController.inserIntoDB
);

router.delete(
    '/:id',
    checkAuth(UserRole.ADMIN),
    SpecialtiesController.deleteFromDB
);

export const SpecialtiesRoutes = router;