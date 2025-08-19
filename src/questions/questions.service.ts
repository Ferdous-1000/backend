import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Exam } from '../exams/exam.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private readonly questionRepo: Repository<Question>,
    @InjectRepository(Exam) private readonly examRepo: Repository<Exam>,
  ) {}

  async addQuestionToExam(examId: number, data: Partial<Question>): Promise<Question> {
    const exam = await this.examRepo.findOne({ where: { id: examId } });
    if (!exam) throw new NotFoundException(`Exam ${examId} not found`);
    const q = this.questionRepo.create({ ...data, exam });
    return this.questionRepo.save(q);
  }

  async updateQuestion(id: number, updated: Partial<Question>): Promise<Question> {
    const q = await this.questionRepo.findOne({ where: { id } });
    if (!q) throw new NotFoundException(`Question ${id} not found`);
    Object.assign(q, updated);
    return this.questionRepo.save(q);
  }

  async deleteQuestion(id: number) {
    const res = await this.questionRepo.delete(id);
    if (!res.affected) throw new NotFoundException(`Question ${id} not found`);
    return { message: 'Question deleted' };
  }

  async getQuestionsByExam(examId: number): Promise<Question[]> {
  return this.questionRepo.find({
    where: { exam: { id: examId } },
    relations: ['exam'],
  });
}
}
