import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { join } from 'path';
import * as LocalSessions from 'telegraf-session-local';
import { CityEntity } from './entity/city.entity';
import { DistributorEntity } from './entity/distributor.entity';
import { ReviewEntity } from './entity/review.entity';
import { ShopEntity } from './entity/shop.entity';
import { TasteEntity } from './entity/taste.entity';
import { UserEntity } from './entity/user.entity';
import { UserService } from './services/user.service';
import { CityService } from "./services/city.service";

const sessions = new LocalSessions({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '6693827573:AAFKIXK7rFrXikL-mOIa6jBE9AuR9eM53fg',
      middlewares: [sessions.middleware()],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'molodost-bot',
      username: 'postgres',
      password: 'postgres',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: ['dist/db/migrations/*.ts'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      CityEntity,
      DistributorEntity,
      ReviewEntity,
      ShopEntity,
      TasteEntity,
      UserEntity,
    ]),
  ],
  controllers: [],
  providers: [AppUpdate, UserService, CityService],
})
export class AppModule {}
