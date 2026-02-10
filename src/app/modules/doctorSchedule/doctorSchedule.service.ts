import { prisma } from "../../shared/prisma";
import { IJWTPayload } from "../../types/common";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { Prisma } from "../../../generated/prisma";

const insertIntoDB = async (user: IJWTPayload, payload: {
    scheduleIds: string[]
}) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ({
        doctorId: doctorData.id,
        scheduleId
    }))

    return await prisma.doctorSchedule.createMany({
        data: doctorScheduleData
    });
}

const getMySchedules = async (
    user: IJWTPayload,
    filters: any,
    options: IOptions
) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { startDateTime, endDateTime, isBooked } = filters;

    const andConditions: Prisma.DoctorScheduleWhereInput[] = [];

    // Filter by doctor's email
    andConditions.push({
        doctor: {
            email: user.email
        }
    });

    // Filter by date range
    if (startDateTime && endDateTime) {
        andConditions.push({
            schedule: {
                AND: [
                    { startDateTime: { gte: startDateTime } },
                    { endDateTime: { lte: endDateTime } }
                ]
            }
        });
    }

    // Filter by booking status
    if (isBooked !== undefined) {
        andConditions.push({
            isBooked: isBooked === 'true'
        });
    }

    const whereConditions: Prisma.DoctorScheduleWhereInput = {
        AND: andConditions
    };

    const result = await prisma.doctorSchedule.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            schedule: true
        }
    });

    const total = await prisma.doctorSchedule.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

const deleteFromDB = async (user: IJWTPayload, scheduleId: string) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    return await prisma.doctorSchedule.delete({
        where: {
            doctorId_scheduleId: {
                doctorId: doctorData.id,
                scheduleId
            }
        }
    });
}

export const DoctorScheduleService = {
    insertIntoDB,
    getMySchedules,
    deleteFromDB
}