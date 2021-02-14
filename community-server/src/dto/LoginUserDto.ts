import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  readonly password: string;
}
