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

  @Column({ name: 'first_name' })
  @IsString({ message: 'First name must be a string' })
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters' })
  firstName: string;

  @Column({ name: 'middle_name', length: 50, nullable: true })
  @IsString({ message: 'Middle name must be a string' })
  @Length(0, 50, { message: 'Middle name must not exceed 50 characters' })
  middleName?: string;

  @Column({ name: 'last_name', length: 50 })
  @IsString({ message: 'Last name must be a string' })
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Column({ type: 'enum', enum: Gender })
  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @Column({ name: 'date_of_birth', type: 'bigint' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: number;

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

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable()
  courses: Course[];

  @ManyToMany(() => Section, (section) => section.students)
  @JoinTable()
  sections: Section[];
}
