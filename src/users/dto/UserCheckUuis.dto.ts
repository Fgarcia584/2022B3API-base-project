import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserCheckUuidDto {
  @IsUUID(4)
  @IsNotEmpty()
  public readonly id!: string;
}
