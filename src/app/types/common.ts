import { UserRole } from "../../generated/prisma";

export type IJWTPayload = {
    id: string;
    email: string;
    role: UserRole;
}