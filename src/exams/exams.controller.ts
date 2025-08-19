import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post(':teacherId')
  addExam(@Param('teacherId') teacherId: number, @Body() dto: CreateExamDto) {
    return this.examsService.addExam(teacherId, dto);
  }

  @Get()
  getAllExams() {
    return this.examsService.getAllExams();
  }

  @Get(':id')
  getExamById(@Param('id') id: number) {
    return this.examsService.getExamById(id);
  }

  @Patch(':id')
  updateExam(@Param('id') id: number, @Body() dto: Partial<CreateExamDto>) {
    return this.examsService.updateExam(id, dto);
  }

  @Delete(':id')
  deleteExam(@Param('id') id: number) {
    return this.examsService.deleteExam(id);
  }
}
