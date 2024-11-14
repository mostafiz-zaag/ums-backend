// src/modules/course/dto/create-course.dto.ts

import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{1,2}\.\d{2}$/, {
    message: 'startTime must be in the format "HH.MM"',
  })
  startTime: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{1,2}\.\d{2}$/, {
    message: 'endTime must be in the format "HH.MM"',
  })
  endTime: string;
}
