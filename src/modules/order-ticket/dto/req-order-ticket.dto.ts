import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ReqFindAllOrderTicketDto {
  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  startDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  endDate: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  status: string;
}
