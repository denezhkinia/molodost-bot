import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'distributors' })
export class DistributorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  link_to_telegram: string;

  @OneToMany(() => ShopEntity, (shop) => shop.distributor)
  shops: ShopEntity[];
}
