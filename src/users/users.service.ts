import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput, BiometricLoginInput } from './dto/auth.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async register(input: RegisterInput): Promise<string> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
    });
    return this.generateToken(user.id);
  }

  async login(input: LoginInput): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new Error('User not found');
    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw new Error('Invalid password');
    return this.generateToken(user.id);
  }

  async biometricLogin(input: BiometricLoginInput): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { biometricKey: input.biometricKey } });
    if (!user) throw new Error('Biometric key not found');
    return this.generateToken(user.id);
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
  }
}