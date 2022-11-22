import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { ProjectUser } from '../project-users/project-users.entity';
import { ProjectUsersService } from '../project-users/services/project-users.service';
import { UsersService } from '../users/services/user.services';
import { User } from '../users/user.entity';
import { ProjectsController } from './controllers/projects.controller';
import { Project } from './project.entity';
import { ProjectsService } from './services/projects.service';



@Module({
  imports: [TypeOrmModule.forFeature([Project, User, ProjectUser])],
  controllers: [ProjectsController],
  providers: [ProjectsService, UsersService, ProjectUsersService, JwtService, JwtStrategy],
  exports: [ProjectsService],
})
export class ProjectModule {}
