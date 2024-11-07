import { Injectable } from '@nestjs/common';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { TeacherRepository } from './teacher.repository';
import { UpdateTeacherDto } from './dto/update.teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherRepository.createTeacher(createTeacherDto);
  }

  async findById(id: number): Promise<Teacher> {
    return await this.teacherRepository.findById(id);
  }

  async findOneAndUpdate(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return await this.teacherRepository.findOneAndUpdate(id, updateTeacherDto);
  }

  async deleteTeacher(id: number): Promise<void> {
    return await this.teacherRepository.deleteTeacher(id);
  }
}
