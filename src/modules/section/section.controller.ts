import { Body, Controller, Post } from '@nestjs/common';

import { CreateSectionDto } from './dto/create.section.dto';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('/create')
  create(@Body() createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionService.create(createSectionDto);
  }
}
