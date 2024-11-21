import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { CreateStudentDTO } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { SectionRepository } from '../section/section.repository';
import { CourseRepository } from '../course/course.repository';
import { UpdateStudentDto } from './dto/update.student.dto';

@Injectable()
export class StudentService {
    constructor(
        private readonly studentRepository: StudentRepository,
        private readonly sectionRepository: SectionRepository,
        private readonly courseRepository: CourseRepository,
    ) {}

    async register(createStudentDto: CreateStudentDTO): Promise<Student> {
        const { email } = createStudentDto;
        const user = await this.studentRepository.findOne({
            where: { email },
        });

        if (user) {
            throw new UnauthorizedException('User already exists.');
        }

        const student = this.studentRepository.create(createStudentDto);
        return await this.studentRepository.save(student);
    }

    async update(
        id: number,
        updateStudentDto: UpdateStudentDto,
    ): Promise<Student> {
        // Step 1: Find the current student by ID
        const existingStudent = await this.studentRepository.findOne({
            where: { id },
            relations: ['courses', 'sections'],
        });

        if (!existingStudent) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        if (updateStudentDto.email) {
            const emailTaken = await this.studentRepository.findOne({
                where: { email: updateStudentDto.email },
            });

            if (emailTaken && emailTaken.id !== id) {
                throw new UnauthorizedException('Email already exists');
            }
        }

        Object.assign(existingStudent, updateStudentDto);
        return await this.studentRepository.save(existingStudent);
    }

    async addSectionToStudent(
        studentId: number,
        sectionId: number,
    ): Promise<Student> {
        const section = await this.sectionRepository.findOne({
            where: { id: sectionId },
        });

        if (!section) {
            throw new NotFoundException('Section not found');
        }
        const student = await this.studentRepository.findOne({
            where: { id: studentId },
            relations: ['sections'],
        });

        if (!student) {
            throw new UnauthorizedException(
                'Section already exists of this student',
            );
        }

        const sectionExists = student.sections.some(
            (existingSection) => existingSection.id === sectionId,
        );
        if (sectionExists) {
            throw new UnauthorizedException(
                'Student is already enrolled in this section',
            );
        }

        student.sections.push(section);
        await this.studentRepository.save(student);

        return this.studentRepository.findOne({
            where: { id: studentId },
            relations: ['sections'],
        });
    }

    async removeSectionFromStudent(
        studentId: number,
        sectionId: number,
    ): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id: studentId },
            relations: ['sections'],
        });
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const sectionIndex = student.sections.findIndex(
            (section) => section.id === sectionId,
        );
        if (sectionIndex === -1) {
            throw new NotFoundException('Section not found for this student');
        }

        student.sections.splice(sectionIndex, 1);

        await this.studentRepository.save(student);

        return student;
    }

    async findById(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id: id },
            relations: ['sections', 'courses'],
        });

        if (!student) {
            throw new UnauthorizedException('Student not found');
        }

        return student;
    }

    async addCourseToStudent(
        studentId: number,
        courseId: number,
    ): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id: studentId },
            relations: ['courses'],
        });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const course = await this.courseRepository.findOne({
            where: { id: courseId },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const courseExists = student.courses.some(
            (existingCourse) => existingCourse.id === courseId,
        );

        if (!courseExists) {
            student.courses.push(course);
            await this.studentRepository.save(student);
        }

        return student;
    }

    async findAll() {
        return await this.studentRepository.find({});
    }
}
