import { IsEmail, IsString, Length } from 'class-validator';

export class CreateTeacherDto {
    @IsString({ message: 'Name must be a string' })
    @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsString({ message: 'password must be a string' })
    @Length(6, 50, { message: 'password must be between 6 and 50 characters' })
    password: string;
}
