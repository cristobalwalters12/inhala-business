import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateManangerUserTicketDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsInt()
  @IsPositive()
  age?: number;

  @IsString()
  email?: string;
}
