// src/modules/course/dto/create-course.dto.ts

import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateCourseDTO {
    @IsNotEmpty({ message: 'title name must not be empty' })
    @IsString({ message: 'title name must be a string' })
    @Length(3, 50, { message: 'Length must be at least 3 to 50 char long' })
    title: string;

    @IsNotEmpty({ message: 'Start time must not be empty' })
    @IsString({ message: 'Start time must be a string' })
    @Matches(/^\d{1,2}\.\d{2}$/, {
        message: 'startTime must be in the format "HH.MM"',
    })
    startTime: string;

    @IsNotEmpty({ message: 'End time must not be empty' })
    @IsString({ message: 'End time must be a string' })
    @Matches(/^\d{1,2}\.\d{2}$/, {
        message: 'endTime must be in the format "HH.MM"',
    })
    endTime: string;
}
