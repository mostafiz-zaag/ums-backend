// src/student/dto/create-student.dto.ts
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateStudentDto {
  @IsString()
  @Length(2, 50)
  first_name: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  middle_name?: string;

  @IsString()
  @Length(2, 50)
  last_name: string;

  @IsEmail()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  phone: string;

  @IsString()
  @Length(5, 100)
  address: string;
}
