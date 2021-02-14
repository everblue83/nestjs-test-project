import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { domains } from '../../../domains';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([domains.User])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
