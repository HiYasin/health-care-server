import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import { AppointmentController } from "./appointment.controller";
import { UserRole } from "../../../generated/prisma";


const router = express.Router();

router.post(
    "/",
    checkAuth(UserRole.PATIENT),
    AppointmentController.createAppointment
)

// router.get(
//     "/",
//     checkAuth(UserRole.PATIENT),
//     AppointmentController.getAppointments
// )

router.get(
    "/my-appointments",
    checkAuth(UserRole.PATIENT, UserRole.DOCTOR),
    AppointmentController.getMyAppointment
)

router.patch(
    "/:id/status",
    checkAuth(UserRole.DOCTOR),
    AppointmentController.updateAppointmentStatus
)

export const AppointmentRoutes = router;