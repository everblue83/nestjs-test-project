import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { BoardDto } from '../dto/boardDto';
import { BoardSearchDto } from '../dto/boardSearchDto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(domains.Board)
    private readonly boardRepository: Repository<domains.Board>,
  ) {}

  createBoard(boardDto: BoardDto) {
    return this.boardRepository.save(this.boardRepository.create(boardDto));
  }

  updateBoard(id: number, boardDto: BoardDto) {
    const board = this.findOne(id);
    board.userId = boardDto.userId;
    board.userName = boardDto.userName;
    board.title = boardDto.title;
    board.content = board.content;
    return this.boardRepository.update(id, board);
  }

  findOne(id: number) {
    let board;
    try {
      board = this.boardRepository.findOne(id);
      return board || null;
    } catch (error) {
      return null;
    }
  }

  findByCategory(category: string) {
    let board;
    try {
      board = this.boardRepository
        .createQueryBuilder('board')
        .where('board.category = :category', { category: category })
        .getMany();
      return board || null;
    } catch (error) {
      return null;
    }
  }

  findArticle(boardSearchDto: BoardSearchDto) {
    let board;
    try {
      board = this.boardRepository
        .createQueryBuilder('board')
        .leftJoinAndSelect('board.user', 'user')
        .select(['board', 'user.username']);

      board =
        boardSearchDto.title !== 'undefined'
          ? board.where('board.title like :title', {
              title: '%' + boardSearchDto.title + '%',
            })
          : board;
      board =
        boardSearchDto.username !== 'undefined'
          ? board.where('user.username like :username', {
              username: '%' + boardSearchDto.username + '%',
            })
          : board;

      board = board.getMany();

      return board || null;
    } catch (error) {
      return null;
    }

    //return this.boardRepository.find();
  }

  findListByCategory(category: string) {
    return this.findByCategory(category);
  }

  deleteBoard(id: number) {
    return this.boardRepository.delete(id);
  }
}
