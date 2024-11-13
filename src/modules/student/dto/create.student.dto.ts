import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Gender } from '../../../enums';

export class CreateStudentDTO {
  @IsString({ message: 'name must be a string' })
  @Length(2, 50, { message: 'name must be between 2 and 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'password can not be empty' })
  @Length(6, 50, {
    message: 'Password length must be between 6 to 50 characters',
  })
  password: string;

  @IsEnum(Gender, { message: 'Gender must be either Male or Female' })
  gender: Gender;

  @IsString({ message: 'phone number must be a string' })
  phoneNumber: string;
}
