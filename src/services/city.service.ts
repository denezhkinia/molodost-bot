import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";
import { Repository } from "typeorm";
import { createName } from "../app.utiles";
import { CityEntity } from "../entity/city.entity";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityRepository: Repository<CityEntity>,
  ) {}
  async getCityByName(name: string) {
    return await this.cityRepository.findOneBy({ name });
  }
}