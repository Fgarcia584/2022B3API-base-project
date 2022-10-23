import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../projects/project.entity";
import { User } from "../users/user.entity";

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  public startDate!: Date; 

  @Column()
  public endDate!: Date; 

  @OneToOne(() => Project, (project) => project.id)
  public projectId!: string; //au format uuidv4

  @OneToOne(() => User, (user) => user.id)
  public userId!: string; //au format uuidv4



}
// class ProjectUser {
//   public id!: string; //au format uuidv4
//   public startDate!: Date; 
//   public endDate!: Date; 
//   public projectId!: string; //au format uuidv4
//   public userId!: string; //au format uuidv4
// }
