import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Equipment } from '../equipment/entities/equipment.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  firstName: string;

  @Column({
    length: 100,
  })
  lastName: string;

  @Column({
    length: 255,
    unique: true,
  })
  email: string;

  @OneToMany(type => Equipment, (entity) => entity.user)
  equipment: Equipment[];
}
