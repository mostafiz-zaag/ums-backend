import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}
}
