import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Exam } from '../exams/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Exam])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
