import { UserDto } from '../dto/UserDto';
import { domains } from '../../../domains';

export const toUserDto = (data: domains.User): UserDto => {
  const { id, username, email } = data,
    userDto: UserDto = { id, username, email };
  return userDto;
};
