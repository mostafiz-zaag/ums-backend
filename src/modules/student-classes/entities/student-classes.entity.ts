import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsOptional } from 'class-validator';

@Entity('student-classes')
export class StudentClasses {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany((type) => StudentClasses, (student) => student.student)
  // studentClassList: StudentClasses[];

  @Column({ name: 'student_id' })
  studentId: number;

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
