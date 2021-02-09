import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;
}
