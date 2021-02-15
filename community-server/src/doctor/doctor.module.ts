import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domains } from '../../../domains';
import { DoctorService } from './doctor.service';

@Module({
  imports: [TypeOrmModule.forFeature([domains.Doctor])],
  controllers: [],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}
