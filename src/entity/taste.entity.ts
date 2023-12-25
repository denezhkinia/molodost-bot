import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tastes' })
export class TasteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  img_path: string;
}
