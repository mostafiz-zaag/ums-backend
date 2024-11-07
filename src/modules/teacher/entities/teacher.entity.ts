import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
} from 'class-validator';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'First name must not be empty' })
  @Length(2, 50, { message: 'First name size between 2 to 50 characters long' })
  @Column({ name: 'first_name', nullable: false, length: 50 })
  firstName: string;

  @IsNotEmpty({ message: 'Last name must not be empty' })
  @Length(2, 50, { message: 'Last name size between 2 to 50 characters long' })
  @Column({ name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(5, 100, {
    message: 'Email size must be between 5 to 100 characters long',
  })
  @Column({ nullable: false, length: 100, unique: true })
  email: string;

  @IsNotEmpty({ message: 'Level must not be empty' })
  @IsInt({ message: 'Level must be an integer' })
  @Column({ nullable: false })
  level: number;

  // Set createdAt to the current UNIX timestamp by default
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
  @Column({
    name: 'updated_at',
    type: 'bigint',
    nullable: true,
  })
  updatedAt: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
