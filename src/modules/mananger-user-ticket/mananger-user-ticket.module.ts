import { Module } from '@nestjs/common';
import { ManangerUserTicketService } from './mananger-user-ticket.service';
import { ManangerUserTicketController } from './mananger-user-ticket.controller';

@Module({
  controllers: [ManangerUserTicketController],
  providers: [ManangerUserTicketService],
})
export class ManangerUserTicketModule {}
