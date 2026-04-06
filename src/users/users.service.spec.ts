import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../model';

describe('UsersService', () => {
  let service: UsersService;

  // Mock UserRepository
  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((query) => {
      // Giả lập kết quả trả về cho test
      const email = query.where?.email;
      if (email === 'admin@gmail.com') {
        return Promise.resolve({
          id: 1,
          email: 'admin@gmail.com',
          name: 'Admin User',
        });
      }
      return Promise.resolve(null);
    }),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one user', async () => {
    const user = await service.findOne('admin@gmail.com');
    expect(user).toBeDefined();
    expect(user?.email).toEqual('admin@gmail.com');
  });
});

