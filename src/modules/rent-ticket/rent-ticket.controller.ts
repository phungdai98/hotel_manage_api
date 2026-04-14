import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RentTicketService } from './rent-ticket.service';
import { CreateRentTicketDto } from './dto/create-rent-ticket.dto';
import { UpdateRentTicketDto } from './dto/update-rent-ticket.dto';

@Controller('rent-ticket')
export class RentTicketController {
  constructor(private readonly rentTicketService: RentTicketService) {}

  @Post()
  create(@Body() createRentTicketDto: CreateRentTicketDto) {
    return this.rentTicketService.create(createRentTicketDto);
  }

  @Get()
  findAll() {
    return this.rentTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentTicketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateRentTicketDto: UpdateRentTicketDto) {
    return this.rentTicketService.update(id, updateRentTicketDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentTicketService.remove(id);
  }
}
