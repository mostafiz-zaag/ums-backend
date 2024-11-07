import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentRepository.createStudent(createStudentDto);
  }
}
