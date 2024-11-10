import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create.section.dto';

@Injectable()
export class SectionRepository extends Repository<Section> {
  constructor(private dataSource: DataSource) {
    super(Section, dataSource.createEntityManager());
  }

  async createStudent(createSectionDto: CreateSectionDto): Promise<Section> {
    const newStudent = this.create(createSectionDto);

    return this.save(newStudent);
  }
}
