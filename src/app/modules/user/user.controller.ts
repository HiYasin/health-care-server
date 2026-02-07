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

export const UserController = {
    createPatient
};