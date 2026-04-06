import { Test, TestingModule } from '@nestjs/testing';
import { DetailPriceRoomController } from './detail-price-room.controller';
import { DetailPriceRoomService } from './detail-price-room.service';

describe('DetailPriceRoomController', () => {
  let controller: DetailPriceRoomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailPriceRoomController],
      providers: [DetailPriceRoomService],
    }).compile();

    controller = module.get<DetailPriceRoomController>(DetailPriceRoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
