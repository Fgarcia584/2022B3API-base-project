import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Between } from "typeorm";
import { Project } from "../../projects/project.entity";
import { User } from "../../users/user.entity";
import { ProjectUser } from "../project-users.entity";

@Injectable()
export class ProjectUsersService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUsersRepository: Repository<ProjectUser>,
  ) {}

  async getProjectUsers(): Promise<ProjectUser[]> {
    return await this.projectUsersRepository.find();
  }
  
  async getOneOfUser(user: User): Promise<ProjectUser[]> {
    return await this.projectUsersRepository.find({ where : { user }});
  }

  async getProjectUsersById(id: string): Promise<ProjectUser> {
    return await this.projectUsersRepository.findOneBy({ id});
  }

  async getMyProjects(user: User): Promise<ProjectUser[]> {
    return await this.projectUsersRepository.find({ where: { user } });
  }

  async isInProject(user: User, project: Project): Promise<ProjectUser> {
    return await this.projectUsersRepository.findOneBy({ user, project });
  }

  async checkBetweenDates(projectUser: ProjectUser): Promise<ProjectUser[]> {
    return await this.projectUsersRepository.find({ where : { startDate: Between(projectUser.startDate, projectUser.endDate), endDate: Between(projectUser.startDate, projectUser.endDate) }});
  }

  async getByDateAndUser(date: Date, user: User): Promise<ProjectUser[]> {
    return await this.projectUsersRepository.find({ where : [{ startDate: Between(date, date) }, { endDate: Between(date, date)}]});
  }

  async create(projectUser: ProjectUser): Promise<ProjectUser> {
    let project = this.projectUsersRepository.create(projectUser);
    return await this.projectUsersRepository.save(project);
  }
}
