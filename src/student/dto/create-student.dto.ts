import { IsString, IsNumber, IsPositive, IsEmail, IsBoolean, IsIn, IsArray, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Grades } from "../entities/grades.entity";

export class CreateStudent{

    @ApiProperty({ example: "Gus Gonzalez", description: "Student's name" })
    @IsString()
    name: string;

    @ApiProperty({ example: 21, description: "Student's age", minimum: 1 })
    @IsNumber()
    @IsPositive()
    age: number;

    @ApiProperty({ example: "gus@example.com", description: "Student's email (must be unique)", format: "email" })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: true, description: "Whether the student is active" })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({ example: "Male", description: "Student's gender", enum: ["Male", "Female", "Other"] })
    @IsString()
    @IsIn(['Male', 'Female', 'Other'])
    gender: string;

    @ApiProperty({ example: ["P.E", "Physics"], description: "Student's favorite subjects", type: [String], required: false })
    @IsArray()
    @IsOptional()
    favoriteSubjects: string[];

    @ApiProperty({
        example: [{ subject: "Physics", grade: 5 }],
        description: "Student's grades",
        type: () => [Grades],
        required: false
    })
    @IsArray()
    @IsOptional()
    grades: Grades[];
}
