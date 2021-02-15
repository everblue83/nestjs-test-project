import { domains } from '../../../domains';
import { DoctorDto } from '../dto/DoctorDto';
import { UserDto } from '../dto/UserDto';

export const toUserDto = (data: domains.User): UserDto => {
  const { id, userid, name, email } = data;
  let userDto: UserDto = { id, userid, name, email, };
  return userDto;
};

export const toDoctorDto = (data: domains.Doctor): DoctorDto => {
  const { id, userid, name, email, category } = data;
  let doctorDto: DoctorDto = { id, userid, name, email, category, };
  return doctorDto;
};