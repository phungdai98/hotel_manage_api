import { Test, TestingModule } from '@nestjs/testing';
import { DetailPriceRoomService } from './detail-price-room.service';

describe('DetailPriceRoomService', () => {
  let service: DetailPriceRoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailPriceRoomService],
    }).compile();

    service = module.get<DetailPriceRoomService>(DetailPriceRoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
