import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id: id } });
  }
  async findUserByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
  
  async findUserByMail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
  
  async findMe(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  createUser(body: UserDto): Promise<User> {
    const newUser = this.usersRepository.create(body);
  
    return this.usersRepository.save(newUser);;
  }

}
