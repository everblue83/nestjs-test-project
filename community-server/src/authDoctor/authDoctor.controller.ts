import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthDoctorService } from './authDoctor.service';
import { RegistrationStatusInterface } from './interface/registrationStatus.interface';
import { CreateDoctorDto } from '../dto/CreateDoctorDto';
import { LoginDoctorDto } from '../dto/LoginDoctorDto';
import { LoginStatus } from './interface/loginStatus.interface';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtDoctorPayload } from './interface/jwtDoctorPayload.interface';

@Controller('authDoctor')
export class AuthDoctorController {
  constructor(private readonly authService: AuthDoctorService) {}

  @ApiBody({ type: CreateDoctorDto })
  @Post('register')
  public async register(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<RegistrationStatusInterface> {
    const result: RegistrationStatusInterface = await this.authService.register(
      createDoctorDto,
    );
    if (!result.status) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @ApiBody({ type: LoginDoctorDto })
  @Post('login')
  public async login(
    @Body() loginDoctorDto: LoginDoctorDto,
  ): Promise<LoginStatus> {
    return await this.authService.login(loginDoctorDto);
  }

  @Get('whoami')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtDoctorPayload> {
    return req.user;
  }
}
