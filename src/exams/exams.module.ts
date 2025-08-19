import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './exam.entity';
import { ExamsService } from './exams.service';
import { Question } from '../questions/question.entity';
import { Teacher } from '../Teachers/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Question, Teacher])],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
