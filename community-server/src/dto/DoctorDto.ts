import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @IsNotEmpty()
  @ApiProperty({ default: 0 })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ default: 'id' })
  userid: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'name' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'me@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '내과' })
  category: string;
}
