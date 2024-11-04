// src/student-classes/entities/student-classes.entity.ts
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class StudentClass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.studentClass, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity.studentClass, {
    onDelete: 'CASCADE',
  })
  class: Class;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
