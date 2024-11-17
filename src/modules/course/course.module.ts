import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';

@Module({
    controllers: [CourseController],
    providers: [CourseService, CourseRepository],
    exports: [CourseService],
})
export class CourseModule {}
