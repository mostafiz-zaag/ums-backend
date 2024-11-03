import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id: number;

  @Column()
  @IsString()
  @Length(2, 50)
  first_name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 50)
  middle_name?: string;

  @Column()
  @IsString()
  @Length(2, 50)
  last_name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  @IsEnum(Gender)
  gender: Gender;

  @Column({ type: 'date' })
  @IsDate()
  dob: Date;

  @Column()
  @IsString()
  phone: string;

  @Column()
  @IsString()
  @Length(5, 100)
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
