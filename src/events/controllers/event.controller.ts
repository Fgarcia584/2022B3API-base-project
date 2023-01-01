import { UseGuards, Controller, Get, Req, Param, Post, HttpException, HttpStatus } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { EventService } from "../services/event.service";


@Controller("events")
export class EventController {
  constructor(
    private eventService: EventService,
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

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEvent(@Req() req) {
    return await this.eventService.createEvent(req.body);
  }
}
