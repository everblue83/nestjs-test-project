import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DoctorModule } from '../doctor/doctor.module';
import { JwtDoctorStrategy } from './jwtDoctor.strategy';
import { AuthDoctorService } from './authDoctor.service';
import { AuthDoctorController } from './authDoctor.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DoctorModule,
    PassportModule.register({
      defaultStrategy: 'jwtDoctor',
      property: 'doctor',
      session: false,
    }),
    JwtModule.register({
      secret: 'testsecret',
      signOptions: {
        expiresIn: '60min',
      },
    }),
  ],
  controllers: [AuthDoctorController],
  providers: [AuthDoctorService, JwtDoctorStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthDoctorModule {}
