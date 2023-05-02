import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from './models/role.enity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(
         private readonly roleService: RoleService
    ){}
    @Get('all')
    async all(){
        return await this.roleService.all()
       
    }
    @Get(':id')
    async get(@Param('id') id:number){
        return await this.roleService.findOne({where:{id}})
       
    }

    @Post('create')
    async create(@Body() name: string): Promise<Role> {
        return await this.roleService.create(name)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        
    ) {
        await this.roleService.update(id, {name});

        const role = await this.roleService.findOne({where:{id}});

        return this.roleService.create({
            ...role,
           
        });
    }

    @Delete(':id')    
    async delete(@Param('id') id: number) {
        return this.roleService.delete(id);
    }
    
}
