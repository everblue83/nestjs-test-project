import {Controller, Get, Body, Post, Put, Param} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { DiagnosisService } from '../service/diagnosis.service';
import { DiagnosisDto } from "../dto/diagnosisDto";
import { PrescribeDto } from "../dto/prescribeDto";

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  // 의사는 자신이 받은 진료 요청서 목록을 조회할 수 있음
  @Get('getDoctorDiagnosis/:doctorId')
  getDoctorDiagnosis(@Param('doctorId') doctorId: number) {
    return this.diagnosisService.findDiagnosisListByDoctorId(doctorId);
  }

  // 의사는 임의의 진료 요청서를 선택하여 처방을 내릴 수 있음
  @ApiBody({ type: PrescribeDto })
  @Put('updatePrescribeOnDiagnosis/:diagnosisId')
  prescribe(@Param('diagnosisId') diagnosisId: number, @Body() prescribeDto: PrescribeDto) {
    return this.diagnosisService.updatePrescribeOnDiagnosis(diagnosisId, prescribeDto);
  }

  // 유저는 임의의 의사를 선택하여 진료요청서를 작성함
  @ApiBody({ type: DiagnosisDto })
  @Post('requestDiagnosis')
  requestDiagnosis(@Body() diagnosisDto: DiagnosisDto) {
    return this.diagnosisService.requestDiagnosis(diagnosisDto);
  }

}
