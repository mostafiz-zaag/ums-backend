import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsOptional } from 'class-validator';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ name: 'classroom_id' })
  classroomId: number;

  @Column({ name: 'subject_id' })
  subjectId: number;

  @Column({ name: 'teacher_id' })
  teacherId: number;

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
