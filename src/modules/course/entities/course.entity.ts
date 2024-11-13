// src/modules/course/entities/course.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Student } from '../../student/entities/student.entity';
import { Section } from '../../section/entities/section.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];

  @OneToMany(() => Section, (section) => section.course)
  sections: Section[];
}
