// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { ClassModule } from './modules/class/class.module';
import { ClassroomModule } from './modules/classroom/classroom.module';
import { SubjectModule } from './modules/subject/subject.module';
import { StudentClassesModule } from './modules/student-classes/student-classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    TeacherModule,
    StudentModule,
    ClassModule,
    ClassroomModule,
    SubjectModule,
    StudentClassesModule,
  ],
})
export class AppModule {}
