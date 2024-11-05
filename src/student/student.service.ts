import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateStudentDto } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      return await this.studentRepository.createStudent(createStudentDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new student.');
    }
  }

  findAll(): Promise<Array<Student>> {
    return this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    try {
      return await this.studentRepository.findOneById(id);
    } catch (error) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
  }

  async update(
    id: number,
    updateData: Partial<CreateStudentDto>,
  ): Promise<Student> {
    try {
      await this.findOne(id);
      await this.studentRepository.update(id, updateData);
      return await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update student with ID ${id}.`,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const student = await this.findOne(id);
      await this.studentRepository.remove(student);
      return { message: `Student with ID ${id} has been removed successfully` };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to remove student with ID ${id}.`,
      );
    }
  }
}
