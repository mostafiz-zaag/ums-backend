import { IsDate, IsEmail, IsInt, IsString, Length } from 'class-validator';

export class CreateTeacherDto {
  @IsInt()
  teacher_id: number;

  @IsString()
  @Length(2, 50)
  first_name: string;

  @IsString()
  @Length(2, 50)
  last_name: string;

  @IsEmail()
  email: string;

  @IsDate()
  joining_date: Date;

  @IsInt()
  level: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
