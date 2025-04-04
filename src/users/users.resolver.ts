import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import {
  RegisterInput,
  LoginInput,
  BiometricLoginInput,
} from './dto/auth.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => String)
  async register(@Args('input') input: RegisterInput) {
    return this.usersService.register(input);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput) {
    return this.usersService.login(input);
  }

  @Mutation(() => String)
  async biometricLogin(@Args('input') input: BiometricLoginInput) {
    return this.usersService.biometricLogin(input);
  }
}
