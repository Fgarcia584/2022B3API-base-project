import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectUser } from "../project-users/project-users.entity";
import { Project } from "../projects/project.entity";
import { ProjectsService } from "../projects/services/projects.service";
import { UsersService } from "../users/services/user.services";
import { User } from "../users/user.entity";
import { EventController } from "./controllers/event.controller";
import { EventService } from "./services/event.service";


@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser, Project, User, Event ])],
  controllers: [EventController],
  providers: [EventService, ProjectsService, UsersService],
})
export class EventModule {}
