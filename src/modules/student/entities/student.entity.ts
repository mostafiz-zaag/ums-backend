import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from '../../section/entities/section.entity';
import { Gender } from '../../../enums';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

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

  @Column({ length: 100 })
  @IsString({ message: 'Address must be a string' })
  @Length(1, 100, { message: 'Address must be between 1 and 100 characters' })
  address: string;

  @ManyToOne(() => Section, (section) => section.students, {
    onDelete: 'SET NULL',
  })
  section: Section;
}
