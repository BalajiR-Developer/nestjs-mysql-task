import { Body, Controller, Post } from '@nestjs/common';
import { CraeteUserDto } from 'src/dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: CraeteUserDto) {
    return this.userService.register(dto);
  }
}
