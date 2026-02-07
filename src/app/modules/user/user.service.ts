import bcrypt from "bcrypt";
import { createPatientInput } from "./user.interface";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";
import { Request } from "express";

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
export const UserService = {
        createPatient
};