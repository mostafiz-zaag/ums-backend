import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Gender } from '../../../enums';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a valid text' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Middle name must be a valid text' })
  @Length(2, 50, { message: 'Middle name must be between 2 and 50 characters' })
  middleName?: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a valid text' })
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsEnum(Gender, {
    message: 'Gender must be one of the following: male, female, other',
  })
  gender: Gender;

  @IsNotEmpty({ message: 'Date of birth is required' })
  @IsInt({ message: 'Date of birth must be a valid UNIX timestamp' })
  @Type(() => Number)
  dateOfBirth: number;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a valid text' })
  @Matches(/^[0-9]{10,15}$/, {
    message: 'Phone number must be between 10 and 15 digits',
  })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a valid text' })
  @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
  address: string;
}
