import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { UpdateTeacherDto } from './dto/update.teacher.dto';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { email } = createTeacherDto;
    const existingEmail = await this.findOne({ where: { email } });

    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }
    const newTeacher = this.create(createTeacherDto);
    return this.save(newTeacher);
  }

  async findById(id: number): Promise<Teacher> {
    const teacher = await this.findOne({ where: { id: id } });

    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }
    return teacher;
  }

  async findOneAndUpdate(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacher = await this.findOne({ where: { id: id } });
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    Object.assign(teacher, updateTeacherDto);
    return this.save(teacher);
  }

  async deleteTeacher(id: number): Promise<void> {
    const teacher = await this.findOne({ where: { id: id } });
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    await this.remove(teacher);
  }
}
