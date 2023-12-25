import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DistributorEntity } from './distributor.entity';

@Entity({ name: 'shops' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @ManyToOne(() => DistributorEntity, (distributor) => distributor.shops)
  distributor: DistributorEntity;
}
