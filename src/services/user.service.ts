import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createName } from "../app.utiles";
import { CityEntity } from "../entity/city.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getUserByTelegramId(telegramId: number) {
    return await this.userRepository.findOneBy( {telegramId});
  }

  async getUserByTelegramIdWithCity(telegramId: number) {
    return await this.userRepository.findOne({ where: { telegramId }, relations:["city"] });
  }

  async addUser(telegramId: number, isAdult: boolean) {
    const user = new UserEntity();
    user.telegramId = telegramId;
    user.isAdult = isAdult;
    return await this.userRepository.save(user);
  }

  async updateUserName(telegramId: number, name: string) {
    const user = await this.userRepository.findOneBy({ telegramId });
    user.name = name;
    return await this.userRepository.save(user);
  }

  async updateUserCity(telegramId: number, city: CityEntity) {
    const user = await this.userRepository.findOneBy({ telegramId });
    user.city = city;
    return await this.userRepository.save(user);
  }
}
