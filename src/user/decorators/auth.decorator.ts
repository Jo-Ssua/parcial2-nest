import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ValidRoles } from "../enums/valid-roles.enum";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";

export function Auth(...roles : ValidRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
        ApiBearerAuth("JWT-auth"),
        ApiUnauthorizedResponse({ description: "Missing or invalid JWT token" }),
        ApiForbiddenResponse({
            description: roles.length
                ? `User needs one of these roles: ${roles.join(", ")}`
                : "User is not allowed to access this resource"
        })
    )
}
