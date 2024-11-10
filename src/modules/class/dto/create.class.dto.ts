import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class name must not be empty' })
  @IsString({ message: 'Class name must be a string' })
  @Length(2, 50, { message: 'Class name must be between 2 and 50 characters' })
  name: string;
}
