import { Exclude } from "class-transformer";
import { Role } from "src/role/models/role.enity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(()=>Role)
    @JoinColumn({name:'role_id'})
    role:Role;
}


