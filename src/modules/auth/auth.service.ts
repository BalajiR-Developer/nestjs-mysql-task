import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dtos/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  login = async (loginDto: LoginDto) => {
    try {
      const { email, password } = loginDto;
      const findUser = await this.userRepo.findOne({ where: { email } });
      if (!findUser) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const accessToken = this.jwtService.sign({
        email,
        id: findUser.id,
        name: findUser.name,
      });
      return {
        accessToken,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Error while logging in');
    }
  };
}
