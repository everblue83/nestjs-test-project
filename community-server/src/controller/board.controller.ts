import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  UseGuards,
  Delete,
  Req, Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BoardService } from '../service/board.service';
import { BoardDto } from '../dto/boardDto';
import { BoardSearchDto } from '../dto/boardSearchDto';
import { AuthGuard } from '@nestjs/passport';

/*
유저는 자신의 게시물만 수정/삭제가 가능함
의사는 게시물을 작성할 수 없으며, 유저가 작성한 게시물에 댓글만 작성할 수 있음
* */
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 유저는 게시물을 작성할 수 있음
  @ApiBody({ type: BoardDto })
  @Post('board')
  createPost(@Req() req, @Body() boardDto: BoardDto) {
    const user = req.user;
    if (user) {
      boardDto.userId = user.id;
      boardDto.userName = user.username;
    } else {
      boardDto.userId = 0;
      boardDto.userName = 'name';
    }
    return this.boardService.createBoard(boardDto);
  }

  // 유저는 전체 게시물을 조회할 수 있음
  // 제목 및 작성자로 검색이 가능함
  @Get('board')
  findArticle(@Query() params: BoardSearchDto) {
    return this.boardService.findArticle(params);
  }

  // 임의의 게시물을 선택하여 본문을 조회할 수 있음
  @Get('board/:id')
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(id);
  }

  // 유저가 (자신의 게시물만)수정
  @ApiBody({ type: BoardDto })
  @Put('board/modify/:id')
  updateDoctor(@Param('id') id: number, @Body() doctorDto: BoardDto) {
    return this.boardService.updateBoard(id, doctorDto);
  }

  // 유저가 (자신의 게시물만)삭제
  @Delete('board/remove/:id')
  deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id);
  }
}
