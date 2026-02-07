import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validateRequest = (zodSchema: ZodObject<ZodRawShape>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // console.log("Validating request body:", req.body);

            // Handle multipart/form-data where the body might be a JSON string
            if(req.body.data){
                req.body = JSON.parse(req.body.data);
            }
            req.body = await zodSchema.parseAsync(req.body);

            // console.log("Validated request body:", req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};