import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create.teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/create')
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @Post(':teacherId/classes')
  assignClasses(
    @Param('teacherId') teacherId: number,
    @Body('classIds') classIds: number[],
  ) {
    return this.teacherService.assignClassesToTeacher(teacherId, classIds);
  }

  @Get('/:teacherId')
  findById(@Param('teacherId') teacherId: number) {
    return this.teacherService.findById(teacherId);
  }
}
