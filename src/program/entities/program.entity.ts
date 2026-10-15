// TODO Reto 1: convierte esta clase en una entidad de TypeORM (tabla "program") con:
//   - id: UUID generado automáticamente
//   - name: text, único
//   - code: text, único
//   - credits: int
// TODO Reto 2: relación 1:N con Student -> propiedad `students?: Student[]`
// TODO Reto 4: relación N:1 con User -> propiedad `createdBy?: User` (el admin que lo creó)
//
// Usa imports relativos (ej. "../../student/entities/student.entity"), no "src/...":

import { Student } from "src/student/entities/student.entity";
import { User } from "src/user/entities/user.entity";
import {  Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Jest no resuelve el alias "src/" y el test de Student dejaría de correr.
export class Program {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type: "text",
        unique: true
    })
    name:string;


    @Column({
        type: "text",
        unique: true
    })
    code:string;

    @Column({
        type: "int",
    })
    credits:number;

    @ManyToOne(() => User,
        {nullable : true}
    )
    createdBy? : User;

    @OneToMany(
        ()=> Student,
        (student) => student.program,
        {cascade: false, eager: true}
    )
    students?: Student[];



}
