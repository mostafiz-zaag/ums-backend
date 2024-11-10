import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { ClassRepository } from '../class/class.repository';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository,
    private readonly classRepository: ClassRepository,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return await this.teacherRepository.save(teacher);
  }

  async assignClassesToTeacher(
    teacherId: number,
    classIds: number[],
  ): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['classes'],
    });

    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    const newClasses = [];
    for (const classId of classIds) {
      const foundClass = await this.classRepository.findOne({
        where: { id: classId },
      });
      if (!foundClass) {
        throw new NotFoundException(`Class with ID ${classId} not found`);
      }
      newClasses.push(foundClass);
    }

    // Merge existing classes with new classes, avoiding duplicates
    const existingClassIds = new Set(teacher.classes.map((cls) => cls.id));
    console.log(existingClassIds)
    const mergedClasses = [
      ...teacher.classes,
      ...newClasses.filter((cls) => !existingClassIds.has(cls.id)),
    ];

    teacher.classes = mergedClasses;

    return this.teacherRepository.save(teacher);
  }

  // teacher.service.ts
  async findById(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['classes'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }
}
