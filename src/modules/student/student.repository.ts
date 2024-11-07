import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create.student.dto';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { email } = createStudentDto;

    const existingEmail = await this.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    const newStudent = this.create(createStudentDto);

    return this.save(newStudent);
  }
}
