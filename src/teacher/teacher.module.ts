import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './teacher.repository';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeacherService, TeacherRepository],
  controllers: [TeacherController],
})
export class TeacherModule {}
