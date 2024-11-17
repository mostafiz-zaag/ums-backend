import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDTO } from './dto/create.course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
    constructor(private readonly courseRepository: CourseRepository) {}

    async create(createCourseDto: CreateCourseDTO): Promise<Course> {
        const { title } = createCourseDto;
        const isExist = await this.courseRepository.findOne({
            where: { title },
        });

        if (isExist) {
            throw new ConflictException('Course title already exists');
        }

        const course = this.courseRepository.create(createCourseDto);
        return await this.courseRepository.save(course);
    }

    async findById(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return course;
    }

    async findAll(): Promise<Course[]> {
        const res = await this.courseRepository.find();
        console.log(res);
        return res;
    }
}
