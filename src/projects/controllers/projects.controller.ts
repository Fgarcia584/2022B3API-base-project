import { Controller, Get, Param, Post, Body, ValidationPipe, UsePipes, UseGuards, NotFoundException, UnauthorizedException, Req } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { UserCheckUuidDto } from "../../users/dto/UserCheckUuid.dto";
import { UsersService } from "../../users/services/user.services";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { ProjectsService } from "../services/projects.service";

@Controller('projects')

export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllProjects(@Req() req ,) {
    if(req.user.role === "Employee") {
      return await this.projectsService.findAllProjectsForEmployee(req.user.id);
    };
    return await this.projectsService.findAllProjects();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findProjectById(@Param() params: UserCheckUuidDto) {
    const to_return =  await this.projectsService.findProjectById(params.id);
    if(to_return === null){
      throw new NotFoundException("");
    }
    return to_return;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async createProject(@Req() req , @Body() project: CreateProjectDto) {
    if(req.user.role !== "admin") throw new UnauthorizedException();
    const project_to_return = await this.projectsService.createProject(project);
    const user_to_return = await this.usersService.findUserById(project_to_return.referringEmployeeId)
    return {project_to_return, user_to_return};
  }
}
