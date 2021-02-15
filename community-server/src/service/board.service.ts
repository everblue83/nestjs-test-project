import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { BoardDto } from '../dto/boardDto';
import { BoardSearchDto } from '../dto/boardSearchDto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(domains.Board)
    private readonly boardRepository: Repository<domains.Board>, //private readonly userRepository: Repository<domains.User>, //private readonly doctorRepository: Repository<domains.Doctor>,
  ) {}

  createBoard(boardDto: BoardDto, user) {
    if (!user) {
      throw new HttpException(
        '로그인 상태가 아닙니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    boardDto.userId = user.id;
    return this.boardRepository.save(this.boardRepository.create(boardDto));
  }

  updateBoard(id: number, boardDto: BoardDto, user) {
    if (!user) {
      throw new HttpException(
        '로그인 상태가 아닙니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (id !== user.id) {
      throw new HttpException('글쓴이가 아닙니다.', HttpStatus.UNAUTHORIZED);
    }
    const board = this.findOne(id);
    // board.userid 가 로그인한 user.id랑 맞는지 체크한다.
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
        .select(['board', 'user.name']);

      board =
        boardSearchDto.title !== 'undefined'
          ? board.where('board.title like :title', {
              title: '%' + boardSearchDto.title + '%',
            })
          : board;
      board =
        boardSearchDto.name !== 'undefined'
          ? board.where('user.name like :name', {
              name: '%' + boardSearchDto.name + '%',
            })
          : board;

      board = board.getMany();

      return board || null;
    } catch (error) {
      return null;
    }
  }

  findListByCategory(category: string) {
    return this.findByCategory(category);
  }

  deleteBoard(id: number, user) {
    if (!user) {
      throw new HttpException(
        '로그인 상태가 아닙니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (id !== user.id) {
      throw new HttpException('글쓴이가 아닙니다.', HttpStatus.UNAUTHORIZED);
    }
    return this.boardRepository.delete(id);
  }
}
