import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Controller('teachers')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @Post('/register')
    async register(
        @Body() createTeachersDto: CreateTeacherDto,
    ): Promise<{ message: string; data: Teacher }> {
        const teacher = await this.teacherService.register(createTeachersDto);

        return {
            message: 'Teacher created successful',
            data: teacher,
        };
    }

    @Post(':teacherId/courses/:courseId')
    async assignCourseToTeacher(
        @Param('teacherId') teacherId: number,
        @Param('courseId') courseId: number,
    ): Promise<{
        message: string;
        data: Teacher;
    }> {
        const teacher = await this.teacherService.assignCourseToTeacher(
            teacherId,
            courseId,
        );
        return {
            message: 'Course assign successful',
            data: teacher,
        };
    }

    @Get('/:teacherId')
    async findById(
        @Param('teacherId') teacherId: number,
    ): Promise<{ message: string; data: Teacher }> {
        return {
            message: 'Teacher fetched successfully',
            data: await this.teacherService.findById(teacherId),
        };
    }
}
