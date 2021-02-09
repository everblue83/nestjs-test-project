import { ApiProperty } from '@nestjs/swagger';

export class DiagnosisDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  symptom: string;

  @ApiProperty()
  doctorId: number;
}
