import { Body, Controller,Get, Delete, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // POST /questions/exam/:examId
  @Post('exam/:examId')
  @UsePipes(new ValidationPipe({ transform: true }))
  add(@Param('examId') examId: number, @Body() dto: CreateQuestionDto) {
    return this.questionsService.addQuestionToExam(+examId, dto);
  }

  // PATCH /questions/:id
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(+id, dto);
  }

  // DELETE /questions/:id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.questionsService.deleteQuestion(+id);
  }

  @Get('exam/:examId/all')
getQuestionsByExam(@Param('examId') examId: number) {
  return this.questionsService.getQuestionsByExam(examId);
}
}
