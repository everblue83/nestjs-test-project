import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from '../controller/board.controller';
import { BoardService } from '../service/board.service';
import { domains } from '../../../domains';
import { AuthModule } from '../authUser/auth.module';
import { AuthDoctorModule } from '../authDoctor/authDoctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([domains.Board]),
    AuthModule,
    AuthDoctorModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
