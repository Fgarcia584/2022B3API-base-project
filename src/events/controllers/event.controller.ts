import { UseGuards, Controller, Get, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("events")
export class EventController {
  constructor() {}

  @Get()
  async getEvents(@Req() req) {
    return "events";
  }
}
