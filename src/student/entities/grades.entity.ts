import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Student } from "./student.entity";

@Entity()
export class Grades {
    @ApiProperty({
        example: "9b2f1c3e-2a4d-4e8b-9f1a-6c7d8e9f0a1b",
        description: "Grade id (UUID)",
        format: "uuid",
        required: false
    })
    @PrimaryGeneratedColumn("uuid")
    id?:string;

    @ApiProperty({
        example: "Physics",
        description: "Subject name"
    })
    @Column("text")
    subject:string;

    @ApiProperty({
        example: 5,
        description: "Grade obtained in the subject"
    })
    @Column("int")
    grade: number;

    @ApiHideProperty()
    @ManyToOne(
        () => Student,
        (student) => student.grades,
        { onDelete: "CASCADE"}
    )
    student?: Student;
    
}
