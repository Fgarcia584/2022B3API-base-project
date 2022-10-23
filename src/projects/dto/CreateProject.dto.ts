import { IsString, MinLength, IsNotEmpty, IsOptional } from "class-validator";

export class CreateProjectDto {
  
  readonly id: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly name!: string;

  @IsOptional()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly referringEmployeeId!: string;
}
