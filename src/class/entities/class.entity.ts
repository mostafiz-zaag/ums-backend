// src/class/entities/class.entity.ts

import { Classroom } from 'src/classroom/entities/classroom.entity';
import { StudentClass } from 'src/studentClass/entities/student.class.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  class_id: number;

  @ManyToOne(() => Classroom, (classroom) => classroom.class, {
    onDelete: 'CASCADE',
  })
  classroom: Classroom;

  @ManyToOne(() => Subject, (subject) => subject.class, {
    onDelete: 'CASCADE',
  })
  subject: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.class, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;

  @Column({ type: 'time' })
  period: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => StudentClass, (studentClass) => studentClass.class)
  studentClass: StudentClass[];
}
