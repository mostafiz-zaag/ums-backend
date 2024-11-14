import { Body, Controller, Post } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create.section.dto';
import { Section } from './entities/section.entity';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/create')
  async create(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<{ message: string; data: Section }> {
    const section = await this.sectionService.create(createSectionDto);

    return {
      message: 'Section created successfully',
      data: section,
    };
  }
}
