import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userFilterableFields, userPagniationFields } from "./user.constant";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import httpStatus from "http-status";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Patient created successfully',
        data: req.body
    })
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await UserService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});


const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields); // searching , filtering
    const options = pick(req.query, userPagniationFields); // pagination and sorting

    const result = await UserService.getAllUsers(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrieved successfully!",
        meta: result.meta,
        data: result.data
    })
});

export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllUsers,
    changeProfileStatus
};