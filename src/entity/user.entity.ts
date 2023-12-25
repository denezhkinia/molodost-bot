import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from './city.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'integer', unique: true })
  telegramId: number;

  @Column({ nullable: true, type: 'text' })
  name: string;

  @Column({ type: 'boolean' })
  isAdult: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToOne(() => CityEntity, (city) => city.user) // specify inverse side as a second parameter
  @JoinColumn( )
  city: CityEntity;
}
