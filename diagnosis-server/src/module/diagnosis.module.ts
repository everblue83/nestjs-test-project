import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisController } from "../controller/diagnosis.controller";
import { DiagnosisService } from "../service/diagnosis.service";
import { domains } from '../../../domains';

@Module({
  imports: [
    TypeOrmModule.forFeature([domains.Diagnosis]),
  ],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
