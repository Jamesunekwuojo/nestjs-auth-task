import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  it('should register a user', async () => {
    const mockUser = { id: '1', email: 'test@example.com', password: 'hashed' };
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);
    const result = await usersService.register({ email: 'test@example.com', password: 'password' });
    expect(result).toBeDefined();
  });
});