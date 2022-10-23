import { Controller, Get, Param, Post, Body, ValidationPipe, UsePipes, UseGuards, NotFoundException, UnauthorizedException, Req } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { UserCheckUuidDto } from "../../users/dto/UserCheckUuid.dto";
import { CreateProjectDto } from "../dto/CreateProject.dto";
import { ProjectsService } from "../services/projects.service";

@Controller('projects')

export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllProjects() {
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
    return await this.projectsService.createProject(project);
  }
}
