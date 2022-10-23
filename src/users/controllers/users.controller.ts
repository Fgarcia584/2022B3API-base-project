import { Body, Controller, Get, Post, Request, UsePipes, ValidationPipe, UseGuards, Req, Param, UseInterceptors, ClassSerializerInterceptor, HttpException, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../services/user.services';
import { User } from '../user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { UserCheckUuidDto } from '../dto/UserCheckUuid.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
    ){}



  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  async SignUp(@Body() body:UserDto) : Promise<User> {
    return this.usersService.createUser(body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findUserByUsername(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UsePipes(ValidationPipe)
  async findUserById(@Param() uuid: UserCheckUuidDto) {
    const to_return = await this.usersService.findUserById(uuid.id)
    if(to_return === null){
      throw new NotFoundException("");
    }
    return to_return;
  }
  
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body) {
    let user = await this.usersService.findUserByMail(body.email);
    
    if (user.password !== body.password) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: "email or password is incorrect",
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

}
