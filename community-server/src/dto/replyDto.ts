import { ApiProperty } from '@nestjs/swagger';
/*
reply 게시물 dto (id 제외, reply, repliedAt 제외)
*/

export class ReplyDto {
  @ApiProperty({ default: 1 })
  doctorId: number;

  @ApiProperty({ default: 'reply string..' })
  reply: string;
}
