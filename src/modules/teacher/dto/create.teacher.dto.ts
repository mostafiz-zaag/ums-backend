import { IsEmail, IsString, Length } from 'class-validator';

export class CreateTeacherDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 50, { message: 'Name must be between 1 and 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString({ message: 'Subject must be a string' })
  @Length(1, 100, { message: 'Subject must be between 1 and 100 characters' })
  subject: string;
}
