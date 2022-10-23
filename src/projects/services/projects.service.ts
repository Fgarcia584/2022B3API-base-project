import { Injectable } from "@nestjs/common";
import { ApiUnauthorizedResponse } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../users/user.entity";
import { Project } from "../project.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  public async findAllProjects(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  public async findProjectById(id: string): Promise<Project | undefined> {
    return await this.projectsRepository.findOne({ where: { id: id } } );
  }

  public async createProject(project: Project): Promise<{Project, User}> {
    this.projectsRepository.create(project); 
    const referringEmployee = await this.projectsRepository.findOne({ where: { id: project.
    referringEmployeeId } } );
    const newProject = await this.projectsRepository.save(project);
    return {newProject, referringEmployee};
  }


}
