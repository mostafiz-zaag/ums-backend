import { IsInt, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateClassroomDto {
  @IsNotEmpty({ message: 'Max capacity is required' })
  @IsNumber({}, { message: 'Max capacity must be a number' })
  @IsInt({ message: 'Max capacity must be an integer' })
  @Min(1, { message: 'Max capacity must be at least 1' })
  @Max(100, { message: 'Max capacity cannot exceed 100' })
  maxCapacity: number;
}
