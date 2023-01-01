import { UseGuards, Controller, Get, Req, Param, Post, HttpException, HttpStatus, Body } from "@nestjs/common";
import { NotFoundException, UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { UsersService } from "../../users/services/user.services";
import { EventService } from "../services/event.service";
import { Event } from "../event.entity";
import { ProjectUsersService } from "../../project-users/services/project-users.service";
import { ProjectsService } from "../../projects/services/projects.service";

@UseGuards(JwtAuthGuard)
@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
    private usersService: UsersService,
    private projectUsersService: ProjectUsersService,
    private projectService: ProjectsService
  ) {}

  @Get()
  async getEvents(@Req() req) {
    return await this.eventService.getEvents();
  }

  
  @Get(':id')
  async getEventById(@Req() req, @Param(':id') id) {
    let event =  this.eventService.getEventById(id);
    if (!event) {
      throw new NotFoundException("Event not found");
    }
    return event;
  }

  @Post()
  async createEvent(@Body() body, @Req() req) {
    let user = await this.usersService.findUserByUsername(req.user.username);
    let todayEvents = await this.eventService.isEventToday(body, user);
    let remoteWeek = await this.eventService.isRemoteWeek(body, user);

    if (todayEvents.length > 0) {
      throw new UnauthorizedException("you already have an event today");
    }

    if (remoteWeek.length >= 2) {
      throw new UnauthorizedException("you already have 2 remote events this week");
    }
    let event = new Event();
    event.date = body.date;
    event.description = body.eventDescription;
    event.type = body.eventType;
    event.user = user;
    body.eventType === "PaidLeave" ? (event.status = "pending") : (event.status = "accepted");

    return this.eventService.createEvent(event);
  }

  @Post(":id/validate")
  @UseGuards(JwtAuthGuard)
  async validateEvent(@Req() req, @Param("id") id: string) {
    let event = await this.eventService.getEventById(id);
    let user = await this.usersService.findUserByUsername(req.user.username);
    
    if (user.role === "Employee") {
      throw new UnauthorizedException("you are not authorized to validate this event");
    }

    if (user.role === "ProjectManager") {
      let projectUsers = await this.projectUsersService.findByDateAndUser(event.date, user);
      if (projectUsers) {
        for (let projectUser of projectUsers) {
          let project = await this.projectService.findProjectById(projectUser.projectId);
          if (project.referringEmployeeId === user.id) {
            return this.eventService.setEventAccepted(event);
          } else {
            continue;
          }
        }
        throw new UnauthorizedException("you are not authorized to validate this event");
      } else {
        throw new UnauthorizedException("you are not authorized to validate this event");
      }
    }
  }

  @Post(":id/decline")
  @UseGuards(JwtAuthGuard)
  async declineEvent(@Req() req, @Param("id") id: string) {
    let event = await this.eventService.getEventById(id);
    let user = await this.usersService.findUserByUsername(req.user.username);
    
    if (user.role === "Employee") {
      throw new UnauthorizedException("you are not authorized to decline this event");
    }

    if (user.role === "ProjectManager") {
      let projectUsers = await this.projectUsersService.findByDateAndUser(event.date, user);
      if (projectUsers) {
        for (let projectUser of projectUsers) {
          let project = await this.projectService.findProjectById(projectUser.projectId);
          if (project.referringEmployeeId === user.id) {
            return this.eventService.setEventDeclined(event);
          } else {
            continue;
          }
        }
        throw new UnauthorizedException("you are not authorized to decline this event");
      } else {
        throw new UnauthorizedException("you are not authorized to decline this event");
      }
    }
  }
}

