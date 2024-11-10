import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Class, (cls) => cls.sections, { onDelete: 'CASCADE' })
  class: Class;

  @OneToMany(() => Student, (student) => student.section)
  students: Student[];
}
