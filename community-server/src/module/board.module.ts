import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { domains } from '../../../domains';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([domains.Board]), AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
