import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ActorModule } from './actor/actor.module';
import { Actor } from './actor/entities/actor.entity';
import { FilmModule } from './film/film.module';
import { AxiosService } from './axios/axios.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { Token } from './auth/entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin123',
      database: 'root',
      // autoLoadEntities: true,
      entities: [Actor, Auth, Token],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    ActorModule,
    FilmModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AxiosService],
})
export class AppModule {}
