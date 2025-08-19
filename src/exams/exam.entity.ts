import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn,
} from 'typeorm';
import { Teacher } from '../Teachers/teacher.entity';
import { Question } from 'src/questions/question.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  type: string; // e.g., MCQ, Written

  @Column({ type: 'int' })
  duration: number; // minutes

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Teacher, { onDelete: 'CASCADE', eager: true })
  teacher: Teacher;

  @OneToMany(() => Question, (q) => q.exam, { cascade: true })
  questions: Question[];
}
