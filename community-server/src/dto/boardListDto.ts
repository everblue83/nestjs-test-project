import { ApiProperty } from '@nestjs/swagger';
/*
board 게시물 dto (id 제외, reply, repliedAt 제외)
 */
export class BoarListDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  title: string;
}
