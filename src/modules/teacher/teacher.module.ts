import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { ClassService } from '../class/class.service';
import { ClassRepository } from '../class/class.repository';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository, ClassService, ClassRepository],
  exports: [TeacherService],
})
export class TeacherModule {}
