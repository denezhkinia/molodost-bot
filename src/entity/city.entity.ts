import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'cities' })
export class CityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @OneToOne(() => UserEntity, (user) => user.city, { cascade: true }) // specify inverse side as a second parameter
  user: UserEntity;
}
