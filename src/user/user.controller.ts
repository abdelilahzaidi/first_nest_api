import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from 'src/auth/auth.service';
import {Request} from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
        ){}
    // @Get('all')
    // async all():Promise<User[]>{
    //     return await this.userService.all()
    // }
    @Get('all')
    async all(@Query('page') page:number=1):Promise<User[]>{
        return await this.userService.paginate(page)
    }
   
    @Post('create')
    async create(@Body() body: UserCreateDto): Promise<User> {
        const password = await bcrypt.hash('1234', 12);

        const {role_id, ...data} = body;

        return this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        });
    }

    @Get(':id')    
    async get(@Param('id') id: number) {
        return this.userService.findOne({where:{id}});
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto
    ) {
        const id = await this.authService.userId(request);

        await this.userService.update(id, body);

        return this.userService.findOne({where:{id}});
    }

    @Put('password')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
    ) {
        if (password !== password_confirm) {
            throw new BadRequestException('Passwords do not match!');
        }

        const id = await this.authService.userId(request);

        const hashed = await bcrypt.hash(password, 12);

        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne({where:{id}});
    }

    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
    ) {
        const {role_id, ...data} = body;
        
        await this.userService.update(id, {
            ...data,
            role: {id: role_id}
        });

        return this.userService.findOne({where:{id}});
    }

    @Delete(':id')    
    async delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }

}
