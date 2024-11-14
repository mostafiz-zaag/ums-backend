import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SectionRepository } from './section.repository';
import { CreateSectionDto } from './dto/create.section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const { name } = createSectionDto;
    const exist = await this.sectionRepository.findOne({
      where: { name },
    });

    if (exist) {
      throw new UnauthorizedException(
        `Section already exists with name ${name}`,
      );
    }
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }
}
