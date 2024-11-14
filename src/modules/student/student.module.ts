import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { SectionService } from '../section/section.service';
import { SectionRepository } from '../section/section.repository';
import { CourseService } from '../course/course.service';
import { CourseRepository } from '../course/course.repository';

@Module({
  controllers: [StudentController],
  providers: [
    StudentService,
    StudentRepository,
    SectionService,
    SectionRepository,
    CourseService,
    CourseRepository,
  ],
  exports: [StudentService, SectionService, CourseService],
})
export class StudentModule {}
