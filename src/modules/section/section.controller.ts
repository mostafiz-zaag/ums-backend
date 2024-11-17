import { Body, Controller, Get, Post } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create.section.dto';
import { Section } from './entities/section.entity';

@Controller('sections')
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

    @Get()
    async read(): Promise<{ data: Section[]; message: string }> {
        const sections = await this.sectionService.findAll();

        return {
            message: 'Section fetched successful',
            data: sections,
        };
    }
}
