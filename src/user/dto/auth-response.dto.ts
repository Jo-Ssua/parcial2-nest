import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
    @ApiProperty({ example: "4fcfc5ab-7902-478f-b173-b8f1e751af12", description: "User id (UUID)", format: "uuid" })
    id: string;

    @ApiProperty({ example: "teacher@example.com", description: "User's email" })
    email: string;

    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", description: "JWT to send as Bearer token" })
    token: string;
}

export class SignupResponse extends AuthResponse {
    @ApiProperty({ example: "Gus Gonzalez", description: "User's full name" })
    fullName: string;

    @ApiProperty({ example: true, description: "Whether the user is active" })
    isActive: boolean;

    @ApiProperty({ example: ["teacher"], description: "User's roles", enum: ["admin", "teacher", "super-user"], isArray: true })
    roles: string[];
}
