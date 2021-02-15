import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { toDoctorDto } from '../shared/mapper';
import { DoctorDto } from '../dto/DoctorDto';
import { LoginDoctorDto } from '../dto/LoginDoctorDto';
import { CreateDoctorDto } from '../dto/CreateDoctorDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(domains.Doctor)
    private readonly doctorRepository: Repository<domains.Doctor>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findDoctorOne(options?: object): Promise<DoctorDto> {
    const doctor = await this.doctorRepository.findOne(options);
    console.log('doctor : ' + doctor);
    return toDoctorDto(doctor);
  }

  async findByLogin({ userid, password }: LoginDoctorDto): Promise<DoctorDto> {
    const doctor = await this.doctorRepository.findOne({ where: { userid } });

    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.UNAUTHORIZED);
    }

    // 패스워드 비교
    const areEqual = await bcrypt.compare(password, doctor.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toDoctorDto(doctor);
  }
  async findByPayload({ userid }: any): Promise<DoctorDto> {
    return await this.findDoctorOne({
      where: { userid },
    });
  }

  async create(doctorDto: CreateDoctorDto): Promise<DoctorDto> {
    const { userid, name, password, email, category } = doctorDto;

    console.log('doctor dto : ' + doctorDto);

    // 유저 id 중복 체크
    const doctorExist = await this.doctorRepository.findOne({
      where: { userid },
    });
    if (doctorExist) {
      throw new HttpException('Doctor already exists', HttpStatus.BAD_REQUEST);
    }

    const doctor: domains.Doctor = await this.doctorRepository.create({
      userid,
      name,
      password,
      email,
      category,
    });
    await this.doctorRepository.save(doctor);
    return toDoctorDto(doctor);
  }
}
