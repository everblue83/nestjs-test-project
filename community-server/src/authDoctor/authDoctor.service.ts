import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DoctorService } from '../doctor/doctor.service';
import { CreateDoctorDto } from '../dto/CreateDoctorDto';
import { RegistrationStatusInterface } from './interface/registrationStatus.interface';
import { JwtDoctorPayload } from './interface/jwtDoctorPayload.interface';
import { DoctorDto } from '../dto/DoctorDto';
import { LoginDoctorDto } from '../dto/LoginDoctorDto';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from './interface/loginStatus.interface';

@Injectable()
export class AuthDoctorService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    doctorDto: CreateDoctorDto,
  ): Promise<RegistrationStatusInterface> {
    let status: RegistrationStatusInterface = {
      status: true,
      message: 'doctor registered',
    };
    try {
      await this.doctorService.create(doctorDto);
    } catch (err) {
      status = {
        status: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginDoctorDto: LoginDoctorDto): Promise<LoginStatus> {
    // find doctor in db
    const doctor = await this.doctorService.findByLogin(loginDoctorDto);

    // generate and sign token
    const token = this._createToken(doctor);

    return {
      userid: doctor.userid,
      ...token,
    };
  }

  private _createToken({ userid }: DoctorDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const doctor: JwtDoctorPayload = { userid };
    const accessToken = this.jwtService.sign(doctor);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateDoctor(payload: JwtDoctorPayload): Promise<DoctorDto> {
    const doctor = await this.doctorService.findByPayload(payload);
    if (!doctor) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return doctor;
  }
}
