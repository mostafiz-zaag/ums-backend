import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create.class.dto';

@Injectable()
export class ClassRepository extends Repository<Class> {
  constructor(private dataSource: DataSource) {
    super(Class, dataSource.createEntityManager());
  }

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const newStudent = this.create(createClassDto);

    return this.save(newStudent);
  }
}
