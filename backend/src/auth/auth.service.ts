import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
    private jwtService: JwtService
    ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const {password, ...result} = user;
        return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return { access_token: this.jwtService.sign(payload)};
  }
}