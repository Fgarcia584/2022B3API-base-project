import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectUser } from "../../project-users/project-users.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(ProjectUser)
    private EventRepository: Repository<Event>,
  ) {}}
