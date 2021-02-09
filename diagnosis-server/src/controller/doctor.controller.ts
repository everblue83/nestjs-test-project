import { Controller, Get, Body, Post, Put, Param } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { DoctorService } from '../service/doctor.service';
import { DoctorDto } from '../dto/doctorDto';

/*

 */
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  // <유저는 의사 목록을 조회할 수 있음>

  // 카테고리별 의사 조회
  @Get('doctorListByCategory/:category')
  getDoctorByCategory(@Param('category') category: string) {
    return this.doctorService.findListByCategory(category);
  }

  // 의사 전체 리스트 조회
  @Get('doctor')
  findAll() {
    return this.doctorService.findAll();
  }

  // 의사 생성
  @ApiBody({ type: DoctorDto })
  @Post('doctor')
  createDoctor(@Body() doctorDto: DoctorDto) {
    return this.doctorService.createDoctor(doctorDto);
  }

  // 의사 수정
  @ApiBody({ type: DoctorDto })
  @Put('doctor/:id')
  updateDoctor(@Param('id') id: number, @Body() doctorDto: DoctorDto) {
    return this.doctorService.updateDoctor(
        id,
        doctorDto,
    );
  }

}
