import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '../../../enums';

export class CreateStudentDto {
  @IsString({ message: 'First name must be a string' })
  @Length(1, 50, { message: 'First name must be between 1 and 50 characters' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Middle name must be a string' })
  @Length(0, 50, { message: 'Middle name must not exceed 50 characters' })
  middleName?: string;

  @IsString({ message: 'Last name must be a string' })
  @Length(1, 50, { message: 'Last name must be between 1 and 50 characters' })
  lastName: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: number;

  @Length(10, 15, {
    message: 'Phone number must be between 10 and 15 characters',
  })
  phoneNumber: string;

  @IsString({ message: 'Address must be a string' })
  @Length(1, 100, { message: 'Address must be between 1 and 100 characters' })
  address: string;

  @IsOptional()
  sectionId: number;
}
