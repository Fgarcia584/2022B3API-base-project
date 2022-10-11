import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';
import {
  IsEmail,
  Min,
} from "class-validator"

@Entity()
@Unique(["username", "password"])
export class User {
  @PrimaryColumn("uuid")
  public id!: string;

  @Min(3)
  @Column("varchar",{ unique: true })
  public username!: string;

  @IsEmail()
  @Column("varchar")
  public email!: string;
  
  @Min(8)
  @Column("varchar", { unique: true })
  public password!: string;
  
  @Column("varchar", { default: 'Employee' })
  public role!: 'Employee' | 'Admin' | 'ProjectManager';

}


// class User {
//   public id!: string; //au format uuidv4
//   public username!: string; // cette propriété doit porter une contrainte d'unicité
//   public email!: string; // cette propriété doit porter une contrainte d'unicité
//   public password!: string;
//   public role!: 'Employee' | 'Admin' | 'ProjectManager' // valeur par defaut : 'Employee'
// }
