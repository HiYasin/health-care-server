import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";


const createPatient = catchAsync(async (req, res) => {
    const result = await UserService.createPatient(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Patient created successfully',
        data: result
    })
});

export const UserController = {
    createPatient
};