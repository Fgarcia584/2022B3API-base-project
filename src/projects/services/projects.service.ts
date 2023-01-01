import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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

  public async findAllProjectsForEmployee(id): Promise<Project[]> {
    return await this.projectsRepository.find({ where: { referringEmployeeId: id }, relations: ["referringEmployee"] });
  }

  public async findProjectById(id: string): Promise<Project | undefined> {
    return await this.projectsRepository.findOneBy({id});
  }

  public async createProject(project: Project): Promise<Project> {
    this.projectsRepository.create(project);
    return this.projectsRepository.save(project);
  }


}
