// src/modules/student/student.controller.ts
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { UpdateStudentDto } from './dto/update.student.dto';

@Controller('students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post('/register')
    async register(
        @Body() createStudentDto: CreateStudentDTO,
    ): Promise<{ message: string; data: Student }> {
        const student = await this.studentService.register(createStudentDto);

        return {
            message: 'Student created successfully',
            data: student,
        };
    }

    @Patch('/:id')
    async update(
        @Param('id') id: number,
        @Body() updateStudentDto: UpdateStudentDto,
    ): Promise<{ message: string; data: Student }> {
        const student = await this.studentService.update(id, updateStudentDto);

        return {
            message: 'Student update successfully',
            data: student,
        };
    }

    @Post(':studentId/sections/:sectionId')
    async addSectionToStudent(
        @Param('studentId') studentId: number,
        @Param('sectionId') sectionId: number,
    ): Promise<{ data: Student; message: string }> {
        const result = await this.studentService.addSectionToStudent(
            studentId,
            sectionId,
        );

        return {
            message: 'Section added to student successfully',
            data: result,
        };
    }

    @Delete(':studentId/sections/:sectionId')
    async removeSectionFromStudent(
        @Param('studentId') studentId: number,
        @Param('sectionId') sectionId: number,
    ): Promise<{ message: string; data: Student }> {
        const student = await this.studentService.removeSectionFromStudent(
            studentId,
            sectionId,
        );
        return {
            message: 'Section removed from student successfully',
            data: student,
        };
    }

    @Get('/:studentId')
    async findById(
        @Param('studentId') studentId: number,
    ): Promise<{ message: string; data: Student }> {
        const student = await this.studentService.findById(studentId);
        return {
            message: 'Student fetched successfully',
            data: student,
        };
    }

    @Post('/:studentId/courses/:courseId')
    async addCourseToStudent(
        @Param('studentId') studentId: number,
        @Param('courseId') courseId: number,
    ): Promise<{
        message: string;
        data: Student;
    }> {
        const student = await this.studentService.addCourseToStudent(
            studentId,
            courseId,
        );

        return {
            message: 'Course added successfully',
            data: student,
        };
    }

    @Get()
    async finAll() {
        const students = await this.studentService.findAll();
        return {
            message: 'Students fetched successful',
            data: students,
        };
    }
}
