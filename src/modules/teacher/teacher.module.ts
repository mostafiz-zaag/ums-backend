import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';
import { Teacher } from './entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from '../course/course.service';
import { CourseRepository } from '../course/course.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    TeacherRepository,
    CourseService,
    CourseRepository,
  ],
  exports: [TeacherService],
})
export class TeacherModule {}
