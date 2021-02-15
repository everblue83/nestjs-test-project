import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { domains } from '../../../domains';
import { toUserDto } from '../shared/mapper';
import { UserDto } from '../dto/UserDto';
import { LoginUserDto } from '../dto/LoginUserDto';
import { CreateUserDto } from '../dto/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(domains.User)
    private readonly userRepository: Repository<domains.User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  async findUserOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ userid, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { userid } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // 패스워드 비교
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }
  async findByPayload({ userid }: any): Promise<UserDto> {
    return await this.findUserOne({
      where: { userid },
    });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { userid, name, password, email } = userDto;

    // 유저 id 중복 체크
    const userExist = await this.userRepository.findOne({
      where: { userid },
    });
    if (userExist) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: domains.User = await this.userRepository.create({
      userid,
      name,
      password,
      email,
    });
    await this.userRepository.save(user);
    return toUserDto(user);
  }
}
