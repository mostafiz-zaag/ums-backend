import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create.student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentRepository extends Repository<Student> {
  constructor(private dataSource: DataSource) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { email } = createStudentDto;

    const existingStudent = await this.findOne({ where: { email } });
    if (existingStudent) {
      throw new BadRequestException(`Email already in use`);
    }

    const newStudent = this.create(createStudentDto);
    return this.save(newStudent);
  }

  async findOneById(id: number): Promise<Student> {
    const student = await this.findOne({ where: { student_id: id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async updateStudent(
    id: number,
    updateData: Partial<CreateStudentDto>,
  ): Promise<Student> {
    const student = await this.findOneById(id);

    Object.assign(student, updateData);
    return this.save(student);
  }

  async removeStudent(id: number): Promise<{ message: string }> {
    const student = await this.findOneById(id);

    await this.remove(student);

    return { message: `Student with ID ${id} has been removed successfully` };
  }
}
