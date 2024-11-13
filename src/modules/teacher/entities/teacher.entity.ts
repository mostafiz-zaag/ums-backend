import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../course/entities/course.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
