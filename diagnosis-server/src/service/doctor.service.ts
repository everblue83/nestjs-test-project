import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { DoctorDto } from '../dto/doctorDto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(domains.Doctor)
    private readonly doctorRepository: Repository<domains.Doctor>,
  ) {}

  createDoctor(doctorDto: DoctorDto) {
    return this.doctorRepository.save(
      this.doctorRepository.create(doctorDto),
    );
  }

  updateDoctor(id: number, doctorDto: DoctorDto) {
    const doctor = this.findOne(id);
    doctor.name = doctorDto.name;
    doctor.category = doctorDto.category;
    return this.doctorRepository.update(id, doctor);
  }

  findOne(id: number) {
      let doctor;
      try {
          doctor = this.doctorRepository.findOne(id);
          return doctor || null;
      } catch (error) {
          return null;
      }
  }

  findByCategory(category: string) {
      let doctor;
      try {
          doctor = this.doctorRepository.createQueryBuilder("doctor")
              .where("doctor.category = :category", {category : category}).getMany();
          return doctor || null;
      } catch (error) {
          return null;
      }
  }

  findAll() {
    return this.doctorRepository.find();
  }

  findListByCategory(category: string) {
      return this.findByCategory(category)
  }


}
