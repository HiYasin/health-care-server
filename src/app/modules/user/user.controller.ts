import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";


const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Patient created successfully',
        data: req.body
    })
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

export const UserController = {
    createPatient,
    createAdmin,
    createDoctor
};