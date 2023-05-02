import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    CommonModule
  ],
  providers: [UserService,AuthService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
