import bcrypt from "bcrypt";
import { createPatientInput } from "./user.interface";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";
import { Request } from "express";
import { Admin, Doctor, UserRole } from "../../../generated/prisma";

const createPatient = async (req: Request) => {

    if(req.file){
        const fileUrl = await fileUploader.uploadToCloudinary(req.file);
        // console.log("File uploaded to Cloudinary. URL:", fileUrl);
        req.body.patient.profilePhoto = fileUrl?.secure_url || null; // Store the URL in the request body for later use
    }
    const hashedPassword = await bcrypt.hash(req.body.password, config.salt_rounds);
    const result = await prisma.$transaction(async (tnx) => {

        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashedPassword,
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        });
    });

    return result;
};

const createAdmin = async (req: Request): Promise<Admin> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
    }

    console.log(req.body.admin.profilePhoto);

    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.admin.email,
        password: hashedPassword,
        role: UserRole.ADMIN
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdAdminData = await transactionClient.admin.create({
            data: req.body.admin
        });

        return createdAdminData;
    });

    console.log(result);
    return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
    }
    const hashedPassword: string = await bcrypt.hash(req.body.password, 10)

    const userData = {
        email: req.body.doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdDoctorData = await transactionClient.doctor.create({
            data: req.body.doctor
        });

        return createdDoctorData;
    });

    return result;
};


export const UserService = {
        createPatient,
        createAdmin,
        createDoctor
};