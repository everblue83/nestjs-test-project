import { ApiProperty } from '@nestjs/swagger';
/*
board 게시물 dto (id 제외, reply, repliedAt 제외)
 */
export class BoardDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}
