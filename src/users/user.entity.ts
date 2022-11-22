import { Exclude } from "class-transformer"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { role } from "../auth/roles.enum"
import { ProjectUser } from "../project-users/project-users.entity"
import { Project } from "../projects/project.entity"
import { Event } from '../events/event.entity';




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
    
    @OneToMany(type => Project, project => project.referringEmployee, { cascade: true })
    projects!: Project[];

    @OneToMany(type => ProjectUser, projectUser => projectUser.user)
    projectUser!: ProjectUser;

    // @OneToMany(type => Event, event => event.user)
    // events!: Event[];
}


