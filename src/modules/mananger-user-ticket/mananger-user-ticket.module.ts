import { Module } from '@nestjs/common';
import { ManangerUserTicketService } from './mananger-user-ticket.service';
import { ManangerUserTicketController } from './mananger-user-ticket.controller';
import { jwtStrategy } from '../../commons/guards/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ManangerUserTicketController],
  providers: [ManangerUserTicketService, jwtStrategy],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class ManangerUserTicketModule {}
