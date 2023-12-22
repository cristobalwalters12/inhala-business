import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateManangerUserTicketDto {
  @IsString()
  @MinLength(3)
  nombre: string;

  @IsString()
  @MinLength(3)
  apellido?: string;

  @IsInt()
  @IsPositive()
  edad?: number;

  @IsString()
  email?: string;
}
