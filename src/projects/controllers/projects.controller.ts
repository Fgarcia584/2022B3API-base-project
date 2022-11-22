import { Controller, Get, Param, Post, Body, ValidationPipe, UsePipes, UseGuards, NotFoundException, UnauthorizedException, Req, ForbiddenException } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ProjectUsersService } from "../../project-users/services/project-users.service";
import { UserCheckUuidDto } from "../../users/dto/UserCheckUuid.dto";
import { UsersService } from "../../users/services/user.services";
import { Project } from "../project.entity";
import { ProjectsService } from "../services/projects.service";

@Controller('projects')

export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    private readonly projectUsersService: ProjectUsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createProject(@Req() req , @Body() body) {
    if(req.user.role !== "admin") throw new UnauthorizedException();
    const referringEmployee = await this.usersService.findUserById(body.referringEmployeeId);
    if (referringEmployee.role === "Employee") {
      throw new UnauthorizedException("Reffering employee must be a project manager");
    }
    const project = new Project();
    project.name = body.name;
    project.referringEmployee = referringEmployee;
    return await this.projectsService.createProject(project);
    // return "Not implemented";
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findProjectById(@Req() req, @Param(':id') params: UserCheckUuidDto) {
    const to_return =  await this.projectsService.findProjectById(params.id);
    let requester = await this.usersService.findUserById(req.user.id);
    if(to_return === null){
      throw new NotFoundException("");
    }
    if (requester.role === "Employee" && !await this.projectUsersService.isInProject(requester, to_return)) {
      throw new ForbiddenException();
    }
    return to_return;
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllProjects(@Req() req ,) {
    if(req.user.role === "Employee") {
      return await this.projectsService.findAllProjectsForEmployee(req.user.id);
    };
    return await this.projectsService.findAllProjects();
  }



}
