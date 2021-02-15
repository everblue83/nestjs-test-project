import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../dto/CreateUserDto';
import { RegistrationStatusInterface } from './interface/registrationStatus.interface';
import { JwtPayload } from './interface/jwtPayload.interface';
import { UserDto } from '../dto/UserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { JwtService } from '@nestjs/jwt';
import { LoginStatus } from './interface/loginStatus.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatusInterface> {
    let status: RegistrationStatusInterface = {
      status: true,
      message: 'user registered',
    };
    try {
      await this.userService.create(userDto);
    } catch (err) {
      status = {
        status: false,
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
      userid: user.userid,
      ...token,
    };
  }

  private _createToken({ userid }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { userid };
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
