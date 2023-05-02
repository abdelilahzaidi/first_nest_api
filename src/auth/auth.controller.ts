import { BadRequestException, Body, ClassSerializerInterceptor, Controller,Get, NotFoundException, Param, Post, Put, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Request,Response} from 'express'
import { AuthGuard } from './auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
        ){}
    @Post('register')
    async register(@Body() body :RegisterDto){
        const hashed=await bcrypt.hash(body.password,12)
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match!!')
        }
        return await this.userService.create({
            last_name:body.last_name,
            first_name:body.first_name,
            email:body.email,
            password:hashed,            
        })
    }
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({where:{email}});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return user;
    }
    
    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request:Request){
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie)
        return this.userService.findOne({where:{id:data['id']}});
    }

    
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success'
        }
    }

    
}
