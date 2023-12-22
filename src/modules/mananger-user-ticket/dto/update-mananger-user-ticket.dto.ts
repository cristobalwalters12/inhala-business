import { PartialType } from '@nestjs/mapped-types';
import { CreateManangerUserTicketDto } from './create-mananger-user-ticket.dto';

export class UpdateManangerUserTicketDto extends PartialType(
  CreateManangerUserTicketDto,
) {}
