import { Test, TestingModule } from '@nestjs/testing';
import { DetailPriceServiceService } from './detail-price-service.service';

describe('DetailPriceServiceService', () => {
  let service: DetailPriceServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailPriceServiceService],
    }).compile();

    service = module.get<DetailPriceServiceService>(DetailPriceServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
