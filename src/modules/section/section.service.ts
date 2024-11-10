import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create.section.dto';
import { SectionRepository } from './section.repository';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    return await this.sectionRepository.createStudent(createSectionDto);
  }
}
