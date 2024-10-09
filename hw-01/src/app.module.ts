import { Module } from '@nestjs/common';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin123',
      database: 'root',
      autoLoadEntities: true,
      synchronize: true
    }), ActorModule],
})
export class AppModule {}
