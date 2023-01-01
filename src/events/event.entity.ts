import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date", nullable: false })
  date!: Date;

  @Column({ default: "pending" })
  status!: "pending" | "accepted" | "declined";

  @Column()
  type!: "RemoteWork" | "PaidLeave";

  @Column({ type: "varchar", nullable: false })
  description!: string;


  @Column({ type: "varchar", nullable: false })
  userId!: string;

  @ManyToOne(type => User, user => user.events)
  user!: User;
}
