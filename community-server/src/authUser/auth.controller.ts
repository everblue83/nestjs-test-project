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
import { RegistrationStatusInterface } from './interface/registrationStatus.interface';
import { CreateUserDto } from '../dto/CreateUserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { LoginStatus } from './interface/loginStatus.interface';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from './interface/jwtPayload.interface';

@Controller('authUser')
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
    if (!result.status) {
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
