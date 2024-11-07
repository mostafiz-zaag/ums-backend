import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { UpdateTeacherDto } from './dto/update.teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('/create')
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.teacherService.findById(id);
  }

  @Patch('/:id')
  findOneAndUpdate(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    console.log('Body ', updateTeacherDto);
    return this.teacherService.findOneAndUpdate(id, updateTeacherDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.teacherService.deleteTeacher(id);

    return { message: `Teacher has been removed successfully` };
  }
}
