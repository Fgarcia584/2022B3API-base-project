import { Controller, Get, Param, Post, Body, ValidationPipe, UsePipes, UseGuards, NotFoundException, UnauthorizedException, Req, ForbiddenException } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { role } from "../../auth/roles.enum";
import { ProjectUsersService } from "../../project-users/services/project-users.service";
import { UsersService } from "../../users/services/user.services";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { Project } from "../project.entity";
import { ProjectsService } from "../services/projects.service";

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
    private readonly projectUsersService: ProjectUsersService
  ) {}

  
  @UsePipes(ValidationPipe)
  @Post()
  async createProject(@Req() req , @Body() body: CreateProjectDto) {
    if(req.user.role !== role.Admin) throw new UnauthorizedException();
    const referringEmployee = await this.usersService.findUserById(body.referringEmployeeId);

    if (referringEmployee.role === role.Employee) {
      throw new UnauthorizedException("Reffering employee must be a project manager");
    }

    const project = new Project();
    project.name = body.name;
    project.referringEmployee = referringEmployee;
    return await this.projectsService.createProject(project);
  }

  
  @Get(':id')
  async findProjectById(@Req() req, @Param(':id') id) {
    const to_return =  await this.projectsService.findProjectById(id);
    let requester = await this.usersService.findUserById(req.user.id);

    if (requester.role === role.Employee && !await this.projectUsersService.isInProject(requester, to_return)) {
      throw new ForbiddenException();
    }

    if(!to_return) throw new NotFoundException();

    return to_return;
  }

  
  
  @Get()
  async findAllProjects(@Req() req ,) {
    if(req.user.role === role.Employee) {
      return await this.projectsService.findAllProjectsForEmployee(req.user.id);
    };
    return await this.projectsService.findAllProjects();
  }



}
