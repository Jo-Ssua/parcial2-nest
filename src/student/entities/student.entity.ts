import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grades } from "./grades.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Student {


    @ApiProperty({
        example:"4fcfc5ab-7902-478f-b173-b8f1e751af12",
        description: "Student id (UUID)",
        format: "uuid"
    })
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @ApiProperty({
        example: "Gus Gonzalez",
        description: "Student's name"
    })
    @Column("text")
    name:string;

    @ApiProperty({
        example: 21,
        description: "Student's age",
        nullable: true
    })
    @Column({
        type: "int",
        nullable: true
    })
    age:number;

    @ApiProperty({
        example: "gus@example.com",
        description: "Student's email (unique)",
        format: "email"
    })
    @Column({
        type: "text",
        unique: true
    })
    email:string;

    @ApiProperty({
        example: true,
        description: "Whether the student is active"
    })
    @Column("boolean")
    isActive: boolean;

    @ApiProperty({
        example: "Male",
        description: "Student's gender",
        enum: ["Male", "Female", "Other"]
    })
    @Column("text")
    gender: string;

    @ApiProperty({
        example: ["P.E", "Physics"],
        description: "Student's favorite subjects",
        type: [String]
    })
    @Column({
        type: "text",
        array: true
    })
    favoriteSubjects:string[];

    @ApiProperty({
        example: "gus_gonzalez21",
        description: "Generated from the name (or given nickname) in lowercase plus the age"
    })
    @Column("text")
    nickname: string;

    @ApiProperty({
        description: "Student's grades",
        type: () => [Grades],
        required: false
    })
    @OneToMany(
        ()=> Grades,
        (grade) => grade.student,
        {cascade: true, eager: true}
    )
    grades?: Grades[]

    // TODO Reto 2: relación N:1 con Program -> propiedad `program?: Program`
    //   (opcional: un estudiante puede no tener programa; si se borra el programa, queda en NULL)

    @BeforeInsert()
    checkNicknameInsert(){
        if(!this.nickname){
            this.nickname = this.name
        }
        this.nickname = this.nickname.toLowerCase()
                        .replaceAll(" ","_")
                        +this.age
    }

    @BeforeUpdate()
    checkNicknameUpdate(){
        this.nickname = this.nickname.toLowerCase()
                        .replaceAll(" ","_")
                        +this.age
    }

}
