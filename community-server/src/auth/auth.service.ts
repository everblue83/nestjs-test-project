import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { RegistrationStatusInterface } from './interface/registration-status.interface';
import { JwtPayload } from './interface/payload.interface';
import { UserDto } from '../dto/UserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from './interface/login-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatusInterface> {
    let status: RegistrationStatusInterface = {
      success: true,
      message: 'user registered',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
    const user = await this.userService.findByLogin(loginUserDto);

    // generate and sign token
    const token = this._createToken(user);

    return {
      username: user.username,
      ...token,
    };
  }

  private _createToken({ username }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
