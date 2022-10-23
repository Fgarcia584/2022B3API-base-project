import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './services/user.services';
import { UsersController } from './controllers/users.controller';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { LocalStrategy } from '../auth/strategies/local.strategy';


@Module({
  imports: [TypeOrmModule.forFeature([User])], // ProjectModule
  providers: [UsersService, AuthService, JwtService, LocalStrategy, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
