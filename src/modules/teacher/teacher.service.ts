import { Injectable } from '@nestjs/common';
import { TeacherRepository } from './teacher.repository';

@Injectable()
export class TeacherService {
  constructor(private readonly teacherRepository: TeacherRepository) {}
}
