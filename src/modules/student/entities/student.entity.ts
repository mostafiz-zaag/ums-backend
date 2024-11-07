import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'First name must not be empty' })
  @IsString({ message: 'First name must be a string' })
  @Length(2, 50, { message: 'First name size between 2 to 50 characters long' })
  @Column({ name: 'first_name', nullable: false, length: 50 })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Middle name must be a string' })
  @Length(2, 50, {
    message: 'Middle name size must be between 2 and 50 characters',
  })
  @Column({ name: 'middle_name', nullable: true, length: 50 })
  middleName?: string;

  @IsNotEmpty({ message: 'Last name must not be empty' })
  @IsString({ message: 'Last name must be a string' })
  @Length(2, 50, { message: 'Last name size between 2 to 50 characters long' })
  @Column({ name: 'last_name', nullable: false, length: 50 })
  lastName: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(5, 100, {
    message: 'Email size must be between 5 to 100 characters long',
  })
  @Column({ nullable: false, length: 100, unique: true })
  email: string;

  @IsNotEmpty({ message: 'Gender must not be empty' })
  @IsEnum(Gender, { message: 'Gender must be one of: male, female, or other' })
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @IsNotEmpty({ message: 'Phone number must not be empty' })
  @IsString({ message: 'Phone number must be a string' })
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Address must not be empty' })
  @IsString({ message: 'Address must be a string' })
  @Length(2, 100, {
    message: 'Address size must be between 2 to 100 characters long',
  })
  @Column({ nullable: false, length: 100 })
  address: string;

  @IsNotEmpty({ message: 'Date of birth must not be empty' })
  @IsInt({ message: 'Date of birth must be a valid UNIX timestamp' })
  @Column({ name: 'date_of_birth', nullable: false, type: 'bigint' })
  dateOfBirth: number;

  @IsOptional()
  @IsInt({ message: 'CreatedAt must be a valid UNIX timestamp' })
  @Column({
    name: 'created_at',
    type: 'bigint',
    default: () => 'EXTRACT(EPOCH FROM NOW())::bigint',
  })
  createdAt: number;

  @IsOptional()
  @IsInt({ message: 'UpdatedAt must be a valid UNIX timestamp' })
  @Column({ name: 'updated_at', type: 'bigint', nullable: true })
  updatedAt?: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
