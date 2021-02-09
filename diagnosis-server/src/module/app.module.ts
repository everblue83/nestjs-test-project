import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { ormConfig } from '../../../domains';
import { DoctorModule } from "./doctor.module";
import { DiagnosisModule } from "./diagnosis.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig as any),
    DoctorModule, DiagnosisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
