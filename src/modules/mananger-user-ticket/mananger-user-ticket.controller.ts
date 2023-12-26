import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ManangerUserTicketService } from './mananger-user-ticket.service';
import { CreateManangerUserTicketDto } from './dto/create-mananger-user-ticket.dto';
import { UpdateManangerUserTicketDto } from './dto/update-mananger-user-ticket.dto';

@Controller('mananger-user-ticket')
export class ManangerUserTicketController {
  constructor(
    private readonly manangerUserTicketService: ManangerUserTicketService,
  ) {}

  @Post()
  async createRequest(
    @Req() req,
    @Body() createManangerUserTicketDto: CreateManangerUserTicketDto,
  ) {
    const trace = req.headers.trace as string;
    return await this.manangerUserTicketService.create(
      trace,
      createManangerUserTicketDto,
    );
  }

  @Get()
  async findAll(@Req() req) {
    const trace = req.headers.trace as string;
    return await this.manangerUserTicketService.findAll(trace);
  }

  @Get(':term')
  async findOne(@Req() req, @Param('term') term: string) {
    const trace = req.headers.trace as string;
    return await this.manangerUserTicketService.findOne(trace, term);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateManangerUserTicketDto: UpdateManangerUserTicketDto,
  ) {
    const trace = req.headers.trace as string;
    return this.manangerUserTicketService.update(
      trace,
      id,
      updateManangerUserTicketDto,
    );
  }
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const trace = req.headers.trace as string;
    return this.manangerUserTicketService.remove(trace, id);
  }
}
