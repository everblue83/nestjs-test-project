import { ApiProperty } from '@nestjs/swagger';

export class PrescribeDto {
  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  comment: string;
}
