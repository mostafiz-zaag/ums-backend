import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

@Entity('classroom')
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'max_capacity' })
  maxCapacity: number;

  @IsOptional()
  @IsInt({ message: 'CreatedAt must be a valid UNIX timestamp' })
  @Column({
    name: 'created_at',
    type: 'bigint',
    default: () => 'EXTRACT(EPOCH FROM NOW())::bigint',
  })
  createdAt: number;

  @IsOptional()
  @IsInt({ message: 'UpdatedAt must be a valid UNIX timestamp' })
  @Column({ name: 'updated_at', type: 'bigint', nullable: true })
  updatedAt?: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
