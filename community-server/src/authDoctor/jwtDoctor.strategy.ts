import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DoctorDto } from '../dto/DoctorDto';
import { AuthDoctorService } from './authDoctor.service';
import { JwtDoctorPayload } from './interface/jwtDoctorPayload.interface';

@Injectable()
export class JwtDoctorStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authDoctorService: AuthDoctorService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'testsecret',
    });
  }

  async validate(payload: JwtDoctorPayload): Promise<DoctorDto> {
    const doctor = await this.authDoctorService.validateDoctor(payload);
    if (!doctor) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return doctor;
  }
}
