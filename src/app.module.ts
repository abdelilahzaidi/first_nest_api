import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Zah14$01471983',
      database: 'nest_gcv',
      entities: [],
      autoLoadEntities:true,
      synchronize: true,
    }),
    UserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
