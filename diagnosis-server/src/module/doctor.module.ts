import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from '../controller/doctor.controller';
import { DoctorService } from '../service/doctor.service';
import { domains } from '../../../domains';

@Module({
  imports: [
    TypeOrmModule.forFeature([domains.Doctor]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
