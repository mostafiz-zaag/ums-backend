import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRepository } from './teacher.repository';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    try {
      return await this.teacherRepository.createTeacher(createTeacherDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
