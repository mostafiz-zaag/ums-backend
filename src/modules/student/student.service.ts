import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { CreateStudentDTO } from './dto/create.student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async register(createStudentDto: CreateStudentDTO): Promise<Student> {
    const { email } = createStudentDto;
    const user = await this.studentRepository.findOne({
      where: { email },
    });

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const student = this.studentRepository.create(createStudentDto);
    return await this.studentRepository.save(student);
  }
}
