import { Controller, Get, Body, Post, Put, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BoardService } from '../service/board.service';
import { BoardDto } from '../dto/boardDto';

/*
유저는 자신의 게시물만 수정/삭제가 가능함
의사는 게시물을 작성할 수 없으며, 유저가 작성한 게시물에 댓글만 작성할 수 있음
* */
@Controller('doctor')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 유저는 게시물을 작성할 수 있음
  @ApiBody({ type: BoardDto })
  @Post('doctor')
  createPost(@Body() boardDto: BoardDto) {
    return this.boardService.createBoard(boardDto);
  }

  // 유저는 전체 게시물을 조회할 수 있음
  // 제목 및 작성자로 검색이 가능함

  @Get('board')
  findAll() {
    return this.boardService.findAll();
  }

  // 임의의 게시물을 선택하여 본문을 조회할 수 있음
  @Get('board/:id')
  findOne(@Param('id') id) {
    return this.boardService.findOne(id);
  }

  // 유저가 (자신의 게시물만)수정
  @ApiBody({ type: BoardDto })
  @Put('board/modify/:id')
  updateDoctor(@Param('id') id: number, @Body() doctorDto: BoardDto) {
    return this.boardService.updateBoard(id, doctorDto);
  }

  // 유저가 (자신의 게시물만)삭제
  @Put('board/remove/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id);
  }
}
