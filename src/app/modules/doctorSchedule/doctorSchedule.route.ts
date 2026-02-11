import express from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import checkAuth from "../../middlewares/checkAuth";
import { UserRole } from "../../../generated/prisma";
import { validateRequest } from "../../middlewares/validateRequest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";

const router = express.Router();

router.get(
    "/my-schedules",
    checkAuth(UserRole.DOCTOR, UserRole.ADMIN),
    DoctorScheduleController.getMySchedules
)

router.post(
    "/",
    checkAuth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.createDoctorScheduleValidationSchema),
    DoctorScheduleController.insertIntoDB
)

router.delete(
    "/:id",
    checkAuth(UserRole.DOCTOR),
    DoctorScheduleController.deleteFromDB
)

export const doctorScheduleRoutes = router;