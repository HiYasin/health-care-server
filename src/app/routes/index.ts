import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.route';
import { DoctorRoutes } from '../modules/doctor/doctor.route';
import { PatientRoutes } from '../modules/patient/patient.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { SpecialtiesRoutes } from '../modules/specialities/specialities.route';
import { AppointmentRoutes } from '../modules/appointment/appointment.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { PrescriptionRoutes } from '../modules/prescription/prescription.route';
import path from 'path';
import { metaRoutes } from '../modules/meta/meta.route';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/appointment',
        route: AppointmentRoutes
    },
    {
        path: '/review',
        route: ReviewRoutes
    },
    {
        path: '/prescription',
        route: PrescriptionRoutes
    },
    {
        path: '/meta',
        route: metaRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;