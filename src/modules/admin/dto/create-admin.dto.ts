import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;
}
