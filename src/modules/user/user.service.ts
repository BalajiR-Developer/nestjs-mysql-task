import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CraeteUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(userDto: CraeteUserDto): Promise<User> {
    const { password, ...userData } = userDto;
    const hashed = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ password: hashed, ...userData });
    const savedUser = await this.userRepo.save(user);
    return savedUser;
  }
}
