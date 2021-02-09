import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { DiagnosisDto } from "../dto/diagnosisDto";
import {PrescribeDto} from "../dto/prescribeDto";

@Injectable()
export class DiagnosisService {
    constructor(
        @InjectRepository(domains.Diagnosis)
        private readonly diagnosisRepository: Repository<domains.Diagnosis>
    ) {}

    requestDiagnosis(diagnosisDto: DiagnosisDto) {
      return this.diagnosisRepository.save(
          this.diagnosisRepository.create(diagnosisDto)
      );
    }

    findDiagnosisListByDoctorId(doctorId: number) {
        let diagnosisList;
        try {
            diagnosisList = this.diagnosisRepository.createQueryBuilder("diagnosis")
                .where("diagnosis.doctorId = :doctorId", {doctorId : doctorId}).getMany();
            return diagnosisList || null;
        } catch (error) {
            return null;
        }
    }

    updatePrescribeOnDiagnosis(id: number, prescribeDto: PrescribeDto) {
        const diagnosis = this.findOne(id);
        diagnosis.doctorId = prescribeDto.doctorId;
        diagnosis.comment = prescribeDto.comment;

        return this.diagnosisRepository.update(id, diagnosis);
    }

    findOne(id: number) {
        let diagnosis;
        try {
            diagnosis = this.diagnosisRepository.findOne(id);
            return diagnosis || null;
        } catch (error) {
            return null;
        }
    }
}
