import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator.js";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";

export const Auth = (...roles: string[]) => {
    roles.push("Admin");
    return applyDecorators (
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard)
)
}