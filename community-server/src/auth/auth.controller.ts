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
import { AuthService } from './auth.service';
import { RegistrationStatusInterface } from './interface/registration-status.interface';
import { CreateUserDto } from '../dto/CreateUserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { LoginStatus } from './interface/login-status.interface';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './interface/payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatusInterface> {
    const result: RegistrationStatusInterface = await this.authService.register(
      createUserDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @ApiBody({ type: LoginUserDto })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
