import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { Teacher } from './entities/teacher.entity';
import * as bcrypt from 'bcrypt';
import { CourseRepository } from '../course/course.repository';

@Injectable()
export class TeacherService {
    constructor(
        private readonly teacherRepository: TeacherRepository,
        private readonly courseRepository: CourseRepository,
    ) {}

    async register(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
        const { email, password } = createTeacherDto;

        const user = await this.teacherRepository.findOne({ where: { email } });
        if (user) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = this.teacherRepository.create({
            ...createTeacherDto,
            password: hashedPassword,
        });

        return await this.teacherRepository.save(teacher);
    }

    async assignCourseToTeacher(
        teacherId: number,
        courseId: number,
    ): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({
            where: { id: teacherId },
            relations: ['courses'],
        });

        if (!teacher) {
            throw new NotFoundException('teacher not found');
        }

        const course = await this.courseRepository.findOne({
            where: { id: courseId },
        });

        console.log(course);

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }
        if (!course) {
            throw new NotFoundException('course not found');
        }

        const existingCourse = teacher.courses.some(
            (c) => c.title === course.title,
        );

        if (existingCourse) {
            throw new ConflictException(
                `course already assign to teacher '${teacher.name}'`,
            );
        }

        teacher.courses.push(course);

        await this.teacherRepository.save(teacher);

        delete teacher.password;
        return teacher;
    }

    async findById(id: number): Promise<Teacher> {
        const teacher = await this.teacherRepository.findOne({
            where: { id: id },
            relations: ['courses'],
        });

        if (!teacher) {
            throw new NotFoundException('Teacher not found');
        }

        delete teacher.password;
        return teacher;
    }
}
