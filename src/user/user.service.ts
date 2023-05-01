import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
    async all(){
        return this.userRepository.find()
    }
    async create(data):Promise<User>{
        return await this.userRepository.save(data)
    }
    async findOne(condition):Promise<User>{
        return await this.userRepository.findOne(condition)
    }
}
