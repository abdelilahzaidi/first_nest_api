import { Injectable } from '@nestjs/common';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository, getDataSourceToken } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}
    async all(){
        return this.userRepository.find()
    }
    async paginate(page:number=1):Promise<any>{
        const take=4;
        const[users,total]=await this.userRepository.findAndCount({
            take,
            skip:(page-1)*take
        })
        return{
            data:users.map(user => {
                const {password, ...data}=user;
                return data
            }),
            meta:{
                total,
                page,
                last_page:Math.ceil(total / take)
            }
        }
    }
    async create(data):Promise<User>{
        return await this.userRepository.save(data)
    }
    async update(id:number,data):Promise<any>{
        return await this.userRepository.update(id,data)
    }
    
    async findOne(condition):Promise<User>{
        return await this.userRepository.findOne(condition)
    }
    async delete(condition):Promise<any>{
        return await this.userRepository.delete(condition)
    }
}
