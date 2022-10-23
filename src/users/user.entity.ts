import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { role } from "../auth/roles.enum"




@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({unique :true, nullable:false})
    username!: string

    @Column({unique :true, nullable:false})
    email!: string

    @Column({nullable:false})
    @Exclude()
    password!: string

    @Column({default: role.Employee, nullable:false})
    role!: role
}


