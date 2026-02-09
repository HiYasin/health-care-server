import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelper";

const checkAuth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken; // cookie parser must be installed and used in the app.ts to access cookies.
            if (!token) {
                throw new Error("You are not authorized!")
            }

            const verifyUser = jwtHelper.verifyToken(token, "abcd");

            req.user = verifyUser;

            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new Error("You are not authorized!")
            }

            next();
        }
        catch (err) {
            next(err)
        }
    }
}

export default checkAuth;