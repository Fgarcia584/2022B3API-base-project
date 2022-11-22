import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm"
import { User } from "../users/user.entity"

@Entity()
export class Project {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    name!: string

    @Column({unique :true, nullable:true})
    description?: string
    
    @OneToOne(() => User, (user) => user.id)
    referringEmployeeId!: string

    @ManyToOne(type => User, user => user.projects)
    referringEmployee !: User;

}


