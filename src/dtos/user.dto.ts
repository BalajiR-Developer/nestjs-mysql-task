import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CraeteUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
