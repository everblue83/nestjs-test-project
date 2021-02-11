import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { ormConfig } from '../../../domains';
import { BoardModule } from "./board.module";

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig as any), BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
