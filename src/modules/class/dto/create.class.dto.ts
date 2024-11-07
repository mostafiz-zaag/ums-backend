import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class name must not be empty' })
  @IsString({ message: 'Class name must be a string' })
  @Length(2, 50, { message: 'Class name must be between 2 and 50 characters' })
  name: string;

  @IsNotEmpty({ message: 'Classroom ID must not be empty' })
  @IsInt({ message: 'Classroom ID must be an integer' })
  classroomId: number;

  @IsNotEmpty({ message: 'Subject ID must not be empty' })
  @IsInt({ message: 'Subject ID must be an integer' })
  subjectId: number;

  @IsNotEmpty({ message: 'Teacher ID must not be empty' })
  @IsInt({ message: 'Teacher ID must be an integer' })
  teacherId: number;
}
