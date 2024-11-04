import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherRepository extends Repository<Teacher> {
  constructor(private dataSource: DataSource) {
    super(Teacher, dataSource.createEntityManager());
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { email } = createTeacherDto;

    if (email) {
      throw new BadRequestException(`Email already in use`);
    }

    const newTeacher = this.create(createTeacherDto);
    return this.save(newTeacher);
  }
}
