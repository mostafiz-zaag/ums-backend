import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { SectionController } from '../section/section.controller';
import { SectionService } from '../section/section.service';
import { SectionRepository } from '../section/section.repository';

@Module({
  controllers: [StudentController, SectionController],
  providers: [
    StudentService,
    SectionService,
    StudentRepository,
    SectionRepository,
  ],
  exports: [StudentService],
})
export class StudentModule {}
