import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create.course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('/create')
    async create(
        @Body() createCourseDto: CreateCourseDTO,
    ): Promise<{ message: string; data: Course }> {
        const course = await this.courseService.create(createCourseDto);

        return {
            message: 'Course created successfully.',
            data: course,
        };
    }

    @Get('/id/:courseId')
    async findById(
        @Param('courseId') courseId: number,
    ): Promise<{ message: string; data: Course }> {
        return {
            message: 'Course fetched successfully',
            data: await this.courseService.findById(courseId),
        };
    }

    @Get()
    async findAll(): Promise<{ message: string; data: Course[] }> {
        return {
            message: 'Course fetched successfully',
            data: await this.courseService.findAll(),
        };
    }
}
