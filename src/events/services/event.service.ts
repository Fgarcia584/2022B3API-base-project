import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Event } from "../../events/event.entity";
import { User } from "../../users/user.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    ) {}

  async getEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  } 

  async getEventById(id: string): Promise<Event | undefined> {
    return await this.eventRepository.findOne({ where: { id:id } });
  }

  async createEvent(event: Event): Promise<Event> {
    let newEvent = this.eventRepository.create(event);
    return this.eventRepository.save(newEvent);
  }

  async setEventAccepted(event: Event): Promise<Event> {
    event.status = "accepted";
    return this.eventRepository.save(event);
  }

  async setEventDeclined(event: Event): Promise<Event> {
    event.status = "declined";
    return this.eventRepository.save(event);
  }

  async isEventToday(event: Event, user: User): Promise<Event[]> {
    return await this.eventRepository.find({ where : { date: event.date, user }});
  }

  async isRemoteWeek(event: Event, user: User): Promise<Event[]> {
    return await this.eventRepository.find({ where : { user, type: "RemoteWork" }});
  }


}
