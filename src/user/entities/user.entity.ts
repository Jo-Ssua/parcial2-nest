import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type: "text",
        unique: true
    })
    email:string;

    @Column({
        type: "text"
    })
    password?:string;

    @Column({
        type: "text",
    })
    fullName:string;

    @Column("bool", {default: true})
    isActive: boolean;

    @Column({
        type: "text",
        array: true,
        default: ["teacher"]
    })
    roles: string[];

    @BeforeInsert()
    @BeforeUpdate()
    checkEmailBeforeChanges(){
        this.email = this.email.toLowerCase().trim();
    }
}
