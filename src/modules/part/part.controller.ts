import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { BaseController } from 'src/common/base.controller';

@Controller('part')
export class PartController extends BaseController {
  constructor(private readonly partService: PartService) {
    super();
  }

  @Post()
  async create(@Body() createPartDto: CreatePartDto) {
    return this.partService.create(createPartDto);
  }

  @Get()
  async findAll() {
    return this.partService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.partService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partService.update(id, updatePartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.partService.remove(id);
  }
}
