import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Register {
    @ApiProperty({ example: "teacher@example.com", description: "User's email (must be unique)", format: "email" })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Abc12345", description: "User's password", minLength: 8, maxLength: 16 })
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password:string;

    @ApiProperty({ example: "Gus Gonzalez", description: "User's full name" })
    @IsString()
    fullName:string;
}
