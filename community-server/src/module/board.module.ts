import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { domains } from '../../../domains';

@Module({
  imports: [
    TypeOrmModule.forFeature([domains.Board]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
