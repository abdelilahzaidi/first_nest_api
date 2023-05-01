import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    last_name:string;
    @Column()
    first_name:string;
    @Column({unique:true})
    email:string;
    @Column()
    @Exclude()
    password:string;
}


