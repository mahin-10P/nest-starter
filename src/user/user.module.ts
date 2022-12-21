import { Module } from '@nestjs/common';
import { User } from 'src/model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
 /*  providers: [UserService, JwtStrategy, JwtAuthGuard],
  controllers: [UserController],
  exports: [JwtAuthGuard, UserService], */
})
export class UserModule {}
