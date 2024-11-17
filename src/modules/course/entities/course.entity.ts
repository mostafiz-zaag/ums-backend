import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Student } from '../../student/entities/student.entity';
import { Section } from '../../section/entities/section.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(5, 100, {
        message: 'Title must be between 5 and 100 characters',
    })
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    @Column({ name: 'start_time' })
    @Matches(/^\d{2}:\d{2}$/, {
        message: 'Start time must be in the format HH:MM',
    })
    @IsNotEmpty({ message: 'Start time cannot be empty' })
    startTime: string;

    @Column({ name: 'end_time' })
    @Matches(/^\d{2}:\d{2}$/, {
        message: 'End time must be in the format HH:MM',
    })
    @IsNotEmpty({ message: 'End time cannot be empty' })
    endTime: string;

    @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @IsNotEmpty({ message: 'Teacher cannot be empty' })
    teacher: Teacher;

    @ManyToMany(() => Student, (student) => student.courses, {
        cascade: true,
    })
    students: Student[];

    @OneToMany(() => Section, (section) => section.course, {
        cascade: true,
    })
    sections: Section[];
}
