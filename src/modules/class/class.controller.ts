import { Body, Controller, Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create.class.dto';
import { Class } from './entities/class.entity';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('/create')
  create(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.classService.create(createClassDto);
  }
}
