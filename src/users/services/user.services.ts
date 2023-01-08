import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  findUserById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
  
  async getUserByMail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
  
  async getMe(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async getMealVouchers(id: string, month: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: id} });
  }
  

  createUser(body: UserDto): Promise<User> {
    const newUser = this.usersRepository.create(body);
  
    return this.usersRepository.save(newUser);;
  }

}
