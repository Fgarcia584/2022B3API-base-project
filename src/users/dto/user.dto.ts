import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, isUUID, MinLength } from "class-validator"
import {role} from "../user.entity"

export class UserDto {

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly  username: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly  email: string

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  readonly password: string

  @IsOptional()
  @IsIn(["Employee", "Admin", "ProjectManager"])
  readonly  role: role
}