import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto} from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}