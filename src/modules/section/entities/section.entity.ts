import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @ManyToOne(() => Course, (course) => course.sections)
    course: Course;

    @ManyToMany(() => Student, (student) => student.sections)
    students: Student[];
}
