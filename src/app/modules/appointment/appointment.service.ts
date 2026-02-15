import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { stripe } from "../../helper/stripe";
import config from "../../../config";

const createAppointment = async (user: IJWTPayload, payload: { doctorId: string, scheduleId: string }) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: payload.doctorId,
            isDeleted: false
        }
    });

    const isBookedOrNot = await prisma.doctorSchedule.findFirstOrThrow({
        where: {
            doctorId: payload.doctorId,
            scheduleId: payload.scheduleId,
            isBooked: false
        }
    })

    const videoCallingId = uuidv4();

    const result = await prisma.$transaction(async (tnx) => {
        const appointmentData = await tnx.appointment.create({
            data: {
                patientId: patientData.id,
                doctorId: doctorData.id,
                scheduleId: payload.scheduleId,
                videoCallingId
            }
        })

        await tnx.doctorSchedule.update({
            where: {
                doctorId_scheduleId: {
                    doctorId: doctorData.id,
                    scheduleId: payload.scheduleId
                }
            },
            data: {
                isBooked: true
            }
        })

        const transactionId = uuidv4();

        const paymentData = await tnx.payment.create({
            data: {
                appointmentId: appointmentData.id,
                amount: doctorData.appointmentFee,
                transactionId
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: `Appointment with ${doctorData.name}`,
                        },
                        unit_amount: doctorData.appointmentFee * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: appointmentData.id,
                paymentId: paymentData.id
            },
            success_url: config.paymentSuccessUrl,
            cancel_url: config.paymentCancelUrl
        });

        // console.log(session);

        return { paymentUrl: session.url };
        // return appointmentData;
    });


    return result;
};


const getAppointments = async (user: IJWTPayload) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });


    const result = await prisma.appointment.findMany({
        where: {
            patientId: patientData.id
        },
        include: {
            doctor: {
                select: {
                    id: true,
                    name: true,
                }
            },
            schedule: {
                select: {
                    id: true,
                    startDateTime: true,
                    endDateTime: true,
                }
            }
        }
    });

    // Transform startDateTime and endDateTime into separate date and time fields using date-fns
    // const transformedResult = result.map((appointment) => ({
    //     ...appointment,
    //     schedule: {
    //         id: appointment.schedule.id,
    //         startDate: format(appointment.schedule.startDateTime, 'yyyy-MM-dd'),
    //         startTime: format(appointment.schedule.startDateTime, 'HH:mm'),
    //         endDate: format(appointment.schedule.endDateTime, 'yyyy-MM-dd'),
    //         endTime: format(appointment.schedule.endDateTime, 'HH:mm'),
    //     }
    // }));

    // return transformedResult;
    return result;
};

export const AppointmentService = {
    createAppointment,
    getAppointments
};