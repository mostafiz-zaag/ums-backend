// src/modules/student/student.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create.student.dto';
import { Student } from './entities/student.entity';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/register')
  async register(
    @Body() createStudentDto: CreateStudentDTO,
  ): Promise<{ message: string; data: Student }> {
    const student = await this.studentService.register(createStudentDto);

    delete student.password;
    return {
      message: 'Student created successfully',
      data: student,
    };
  }
}
