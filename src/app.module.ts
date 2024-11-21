// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { SectionModule } from './modules/section/section.module';
import { CourseModule } from './modules/course/course.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(databaseConfig),
        TeacherModule,
        StudentModule,
        SectionModule,
        CourseModule,
    ],
})
export class AppModule {}
