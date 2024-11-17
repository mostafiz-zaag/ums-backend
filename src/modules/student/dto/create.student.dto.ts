import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    IsOptional,
} from 'class-validator';
import { Gender } from '../../../enums';

export class CreateStudentDTO {
    @IsString({ message: 'Name must be a string' })
    @Length(2, 50, { message: 'Name must be between 2 and 50 characters' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password cannot be empty' })
    @Length(6, 50, {
        message: 'Password length must be between 6 to 50 characters',
    })
    password: string;

    @IsEnum(Gender, {
        message: 'Gender must be either male, female, or others',
    })
    gender: Gender;

    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^\+?[0-9]{7,15}$/, {
        message:
            'Phone number must be between 7 and 15 digits and can include an optional "+" prefix',
    })
    phoneNumber: string;

    @IsOptional()
    @IsString({ message: 'Address must be a string' })
    @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
    address?: string;

    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date of birth must be in the format YYYY-MM-DD',
    })
    dob?: string;
}
