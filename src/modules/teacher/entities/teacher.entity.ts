import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { IsEmail, IsString, Length } from 'class-validator';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  @IsString({ message: 'Name must be a string' })
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Column({ length: 100 })
  @IsString({ message: 'Subject must be a string' })
  @Length(1, 100, { message: 'Subject must be between 1 and 100 characters' })
  subject: string;

  @ManyToMany(() => Class, (cls) => cls.teachers)
  classes: Class[];
}
