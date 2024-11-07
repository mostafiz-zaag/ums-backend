import { IsEmail, IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty({ message: 'First name must not be empty' })
  @Length(2, 50, {
    message: 'First name size must be between 2 and 50 characters',
  })
  firstName: string;

  @IsNotEmpty({ message: 'Last name must not be empty' })
  @Length(2, 50, {
    message: 'Last name size must be between 2 and 50 characters',
  })
  lastName: string;

  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Length(5, 100, {
    message: 'Email size must be between 5 and 100 characters',
  })
  email: string;

  @IsNotEmpty({ message: 'Level must not be empty' })
  @IsInt({ message: 'Level must be an integer' })
  level: number;
}
