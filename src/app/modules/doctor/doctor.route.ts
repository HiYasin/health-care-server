import express from "express";
import { DoctorController } from "./doctor.controller";
import checkAuth from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
const router = express.Router();

router.get(
    "/",
    DoctorController.getAllFromDB
);

router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.DOCTOR),
    DoctorController.updateIntoDB
);

router.delete(
    '/:id',
    checkAuth(UserRole.ADMIN),
    DoctorController.deleteFromDB
);

router.delete(
    '/soft/:id',
    checkAuth(UserRole.ADMIN),
    DoctorController.softDelete);



export const DoctorRoutes = router;