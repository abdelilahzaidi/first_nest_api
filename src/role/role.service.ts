import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './models/role.enity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>
    ){}

    async all():Promise<Role[]>{
        return await this.roleRepository.find()
    }

    async create(data):Promise<Role>{
        return await this.roleRepository.save(data)
    }
    async update(id:number,data):Promise<any>{
        return await this.roleRepository.update(id,data)
    }
    
    async findOne(condition):Promise<Role>{
        return await this.roleRepository.findOne(condition)
    }
    async delete(condition):Promise<any>{
        return await this.roleRepository.delete(condition)
    }

}
