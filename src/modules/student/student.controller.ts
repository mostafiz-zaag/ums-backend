import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create.student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.studentService.findById(id);
  }
}
