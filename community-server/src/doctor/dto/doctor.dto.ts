import { IsNotEmpty, IsEmail } from 'class-validator';

export class DoctorDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  userid: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  category: string;

  createdAt?: Date;
}
