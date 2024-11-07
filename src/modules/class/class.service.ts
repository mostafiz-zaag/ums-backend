import { Injectable } from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create.class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(private readonly classRepository: ClassRepository) {}

  async create(createClasDto: CreateClassDto): Promise<Class> {
    return await this.classRepository.createClass(createClasDto);
  }
}
