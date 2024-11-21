import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Gender } from '../../../enums';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Course } from '../../course/entities/course.entity';
import { Section } from '../../section/entities/section.entity';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString({ message: 'name must be a string' })
    @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
    name: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @Column({ type: 'enum', enum: Gender })
    @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
    gender: Gender;

    @Column({ length: 15 })
    @Length(10, 15, {
        message: 'Phone number must be between 10 and 15 characters',
    })
    phoneNumber: string;

    @IsNotEmpty({ message: 'password can not be empty' })
    @Length(6, 50, {
        message: 'Password length must be between 6 to 50 characters',
    })
    @Column({ length: 50, nullable: false })
    password: string;

    @ManyToMany(() => Course, (course) => course.students, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    courses: Course[];

    @ManyToMany(() => Section, (section) => section.students, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    sections: Section[];
}
