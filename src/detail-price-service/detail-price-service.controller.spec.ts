import { Test, TestingModule } from '@nestjs/testing';
import { DetailPriceServiceController } from './detail-price-service.controller';
import { DetailPriceServiceService } from './detail-price-service.service';

describe('DetailPriceServiceController', () => {
  let controller: DetailPriceServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailPriceServiceController],
      providers: [DetailPriceServiceService],
    }).compile();

    controller = module.get<DetailPriceServiceController>(DetailPriceServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
