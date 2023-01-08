import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/services/user.services";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ){}

  async validateUser(username: string, pass: string): Promise<any>{
    const user = await this.userService.getUserByMail(username);
    console.warn("xxxxxxxx", user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { secret : process.env.JWT_SECRET }),
    };
  }
}
