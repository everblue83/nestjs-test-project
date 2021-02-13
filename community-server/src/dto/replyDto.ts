import { ApiProperty } from '@nestjs/swagger';
/*
reply 게시물 dto (id 제외, reply, repliedAt 제외)
*/

export class BoardDto {
  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  reply: string;
}
