import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exam } from '../exams/exam.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text', nullable: true })
  options: string; // JSON string for MCQs

  @Column({ type: 'varchar', length: 255, nullable: true })
  answer: string;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  exam: Exam;
}
