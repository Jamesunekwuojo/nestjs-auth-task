/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
//

import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { AuthService } from './auth.service';

const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'defaultSecret',
  signOptions: { expiresIn: '1h' },
};

@Module({
  imports: [JwtModule.register(jwtConfig)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
