import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create.student.dto';
import { Student } from './entities/student.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SectionRepository } from '../section/section.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { sectionId, email } = createStudentDto;

    const isEmailExists = await this.studentRepository.findOne({
      where: { email },
    });

    if (isEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    const isSectionExists = await this.sectionRepository.findOne({
      where: { id: sectionId },
    });

    if (!isSectionExists) {
      throw new BadRequestException('Section not found');
    }

    const student = new Student();
    student.firstName = createStudentDto.firstName;
    student.middleName = createStudentDto.middleName;
    student.lastName = createStudentDto.lastName;
    student.email = createStudentDto.email;
    student.gender = createStudentDto.gender;
    student.dateOfBirth = createStudentDto.dateOfBirth;
    student.phoneNumber = createStudentDto.phoneNumber;
    student.address = createStudentDto.address;
    student.section = isSectionExists;

    return await this.studentRepository.save(student);
  }

  async findById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id: id },
      relations: ['section'],
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return student;
  }
}
