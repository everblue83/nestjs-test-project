import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Param,
  UseGuards,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BoardService } from '../service/board.service';
import { BoardDto } from '../dto/BoardDto';
import { BoardSearchDto } from '../dto/BoardSearchDto';
import { AuthGuard } from '@nestjs/passport';
import { ReplyDto } from '../dto/ReplyDto';

@Controller('user')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  //의사는 게시물을 작성할 수 없으며, 유저가 작성한 게시물에 댓글만 작성할 수 있음

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwtdoctor'))
  @ApiBody({ type: BoardDto })
  @Post('board/createReply')
  async createReply(@Req() req, @Body() replyDto: ReplyDto) {
    return await this.boardService.createReply(replyDto, req.user);
  }
  // 유저는 게시물을 작성할 수 있음
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: BoardDto })
  @Post('board/create')
  async createPost(@Req() req, @Body() boardDto: BoardDto) {
    return await this.boardService.createBoard(boardDto, req.user);
  }

  // 유저는 전체 게시물을 조회할 수 있음
  // 제목 및 작성자로 검색이 가능함
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('board/query')
  findArticle(@Query() params: BoardSearchDto) {
    return this.boardService.findArticle(params);
  }

  // 임의의 게시물을 선택하여 본문을 조회할 수 있음
  @Get('board/query/:id')
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(id);
  }

  // 유저가 (자신의 게시물만)수정
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: BoardDto })
  @Put('board/modify/:id')
  updateArticle(
    @Param('id') id: number,
    @Body() boardDto: BoardDto,
    @Req() req,
  ) {
    return this.boardService.updateBoard(id, boardDto, req.user);
  }

  // 유저가 (자신의 게시물만)삭제
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('board/remove/:id')
  deleteBoard(@Param('id') id: number, @Req() req) {
    return this.boardService.deleteBoard(id, req.user);
  }
}
