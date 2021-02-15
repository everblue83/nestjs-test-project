import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDoctorDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'doctorid' })
  readonly userid: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'password' })
  readonly password: string;
}
