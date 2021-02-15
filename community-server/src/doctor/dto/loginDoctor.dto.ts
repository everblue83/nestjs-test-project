import { IsNotEmpty } from 'class-validator';

export class LoginDoctorDto {
  @IsNotEmpty()
  readonly doctorid: string;

  @IsNotEmpty()
  readonly password: string;
}
