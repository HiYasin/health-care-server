import httpStatus from 'http-status';
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma";
import { Specialties } from "../../../generated/prisma";
import ApiError from "../../error/ApiError";
import { ISpecialties } from './specialities.interface';

const inserIntoDB = async (req: Request) => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const payload: ISpecialties = req.body;

    const isExist = await prisma.specialties.findFirst({
        where: {
            title: payload.title,
        },
    });

    if (isExist) {
        throw new ApiError(httpStatus.CONFLICT, "Specialty already exists");
    }

    const result = await prisma.specialties.create({
        data: payload
    });

    return result;
};

const getAllFromDB = async (): Promise<Specialties[]> => {
    return await prisma.specialties.findMany();
}

const deleteFromDB = async (id: string): Promise<Specialties> => {
    const isSpecialtyExist = await prisma.specialties.findUnique({
        where: {
            id,
        },
    });
    if (!isSpecialtyExist) {
        throw new ApiError(httpStatus.NOT_FOUND,"Specialty not found");
    }
    const result = await prisma.specialties.delete({
        where: {
            id,
        },
    });
    console.log(result);
    return result;
};

export const SpecialtiesService = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
}