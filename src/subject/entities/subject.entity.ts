// src/subject/entities/subject.entity.ts
import { Class } from 'src/class/entities/class.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column()
  max_capacity: number;

  @Column()
  subject_name: string;

  @OneToMany(() => Class, (classEntity) => classEntity.subject)
  class: Class[];
}
