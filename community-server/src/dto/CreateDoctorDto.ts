import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'doctorid' })
  userid: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'me@email.com' })
  email: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: '내과' })
  category: string;
}
