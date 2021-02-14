import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'me@email.com' })
  email: string;
}
