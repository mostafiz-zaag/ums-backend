import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create.student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentServices: StudentService) {}

  @Post('/create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentServices.create(createStudentDto);
  }
}
