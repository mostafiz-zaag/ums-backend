import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateStudentDto } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('/register')
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateStudentDto>,
  ): Promise<Student> {
    return this.studentService.update(id, updateData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return await this.studentService.remove(id);
  }
}
