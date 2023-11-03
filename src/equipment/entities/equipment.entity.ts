import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/user.entity';

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  type: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  serialNumber: string;

  @ManyToOne((type) => User, (entity) => entity.equipment)
  @JoinColumn()
  user: User;
}
