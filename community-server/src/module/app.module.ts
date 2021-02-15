import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { ormConfig } from '../../../domains';
import { BoardModule } from './board.module';
import { AuthModule } from '../authUser/auth.module';
import { AuthDoctorModule } from '../authDoctor/authDoctor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    BoardModule,
    AuthModule,
    AuthDoctorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
