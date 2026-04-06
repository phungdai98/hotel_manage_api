import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
export abstract class BaseController {}