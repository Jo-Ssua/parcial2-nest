import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Login {
    @ApiProperty({ example: "teacher@example.com", description: "User's email", format: "email" })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Abc12345", description: "User's password", minLength: 8, maxLength: 16 })
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}
