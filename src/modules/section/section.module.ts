import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepository } from './section.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Section])],
    controllers: [SectionController],
    providers: [SectionService, SectionRepository],
    exports: [SectionService],
})
export class SectionModule {}
