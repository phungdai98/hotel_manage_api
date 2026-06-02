import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderTicket } from 'src/model';
import { DataSource } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { of } from 'rxjs';

describe('OrderService', () => {
  let service: OrderService;
  let mockQueryRunner: any;
  let mockOrderTicketRepository: any;
  let mockMailClient: any;

  beforeEach(async () => {
    // 1. Mock QueryRunner (vì Order dùng Transaction)
    mockQueryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
      },
    };

    // 2. Mock DataSource chứa QueryRunner
    const mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    };

    // 3. Mock Repository chính
    mockOrderTicketRepository = {
      findOne: jest.fn(),
      find: jest.fn(),
    };

    // 4. Mock RabbitMQ Client
    mockMailClient = {
      connect: jest.fn().mockResolvedValue(true),
      // emit trả về 1 Observable (dùng of() của rxjs để giả lập)
      emit: jest.fn().mockReturnValue(of(true)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(OrderTicket),
          useValue: mockOrderTicketRepository,
        },
        {
          provide: 'MAIL_SERVICE',
          useValue: mockMailClient,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an order successfully with new customer', async () => {
      const orderDto: any = {
        dateStart: '2024-01-01',
        dateEnd: '2024-01-05',
        customer: { phone: '0987654321', name: 'John Doe' },
        details: [{ roomId: 'room1', price: 100 }],
      };

      // Giả lập customer chưa tồn tại -> findOne trả về null
      mockQueryRunner.manager.findOne.mockResolvedValueOnce(null);

      // Giả lập lưu Customer thành công
      mockQueryRunner.manager.create.mockReturnValueOnce({
        id: 'cus-1',
        ...orderDto.customer,
      });
      mockQueryRunner.manager.save.mockResolvedValueOnce({ id: 'cus-1' });

      // Giả lập lưu OrderTicket thành công
      mockQueryRunner.manager.create.mockReturnValueOnce({
        id: 'order-1',
        code: 123,
      });
      mockQueryRunner.manager.save.mockResolvedValueOnce({
        id: 'order-1',
        code: 123,
      });

      // Giả lập lưu Detail
      mockQueryRunner.manager.create.mockReturnValueOnce({ id: 'detail-1' });
      mockQueryRunner.manager.save.mockResolvedValueOnce([{ id: 'detail-1' }]);

      // Giả lập query lại result cuối cùng để response
      mockOrderTicketRepository.findOne.mockResolvedValueOnce({
        id: 'order-1',
        dateStart: '2024-01-01',
        dateEnd: '2024-01-05',
        detailOrderTickets: [],
      });

      const result = await service.create(orderDto);

      expect(mockQueryRunner.startTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(mockMailClient.emit).toHaveBeenCalledWith(
        'booking_confirmed',
        expect.any(Object),
      );
      expect(result.success).toBe(true);
    });

    it('should rollback transaction if an error occurs', async () => {
      const orderDto: any = {
        dateStart: '2024-01-01',
        dateEnd: '2024-01-05',
        customer: { phone: '0987654321' },
      };

      // Giả lập lỗi khi lưu DB
      mockQueryRunner.manager.findOne.mockRejectedValue(new Error('DB Error'));

      await expect(service.create(orderDto)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
      expect(mockMailClient.emit).not.toHaveBeenCalled(); // Không được gửi mail nếu lỗi
    });
  });
});
