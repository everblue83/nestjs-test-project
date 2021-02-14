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
  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }
  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.userRepository.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: domains.User = await this.userRepository.create({
      username,
      password,
      email,
    });
    await this.userRepository.save(user);
    return toUserDto(user);
  }
}
