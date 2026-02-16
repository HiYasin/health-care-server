import express from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../helper/fileUploader";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import checkAuth from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
const router = express.Router();

router.post(
    '/create-patient',
    fileUploader.upload.single('file'),
    validateRequest(UserValidation.createPatientValidationSchema),
    UserController.createPatient
);

router.post(
    "/create-admin",
    checkAuth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    validateRequest(UserValidation.createAdminValidationSchema),
    UserController.createAdmin
);

router.post(
    "/create-doctor",
    checkAuth(UserRole.ADMIN),
    fileUploader.upload.single('file'),
    validateRequest(UserValidation.createDoctorValidationSchema),
    UserController.createDoctor
);

router.get(
    "/get-all-users",
    checkAuth(UserRole.ADMIN),
    UserController.getAllUsers
);

router.patch(
    "/status/:id",
    checkAuth(UserRole.ADMIN),
    UserController.changeProfileStatus
);

export const userRoutes = router;