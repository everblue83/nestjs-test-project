import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'me@email.com' })
  email: string;
}
