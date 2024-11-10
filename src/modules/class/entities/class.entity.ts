import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Section } from '../../section/entities/section.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Section, (section) => section.class)
  sections: Section[];

  @ManyToMany(() => Teacher, (teacher) => teacher.classes)
  @JoinTable()
  teachers: Teacher[];
}
