import { Class } from 'src/class/entities/class.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  classroom_id: number;

  @Column()
  max_capacity: number;

  @Column()
  name: string;

  @OneToMany(() => Class, (classEntity) => classEntity.classroom)
  class: Class[];
}
