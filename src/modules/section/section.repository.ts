import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionRepository extends Repository<Section> {
  constructor(private dataSource: DataSource) {
    super(Section, dataSource.createEntityManager());
  }
}
