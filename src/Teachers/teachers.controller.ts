import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExamsService } from 'src/exams/exams.service';
import { CreateExamDto } from '../exams/dto/create-exam.dto';
import { QuestionsService } from '../questions/questions.service';
import { CreateQuestionDto } from '../questions/dto/create-question.dto';
import { teachersService } from './teachers.service';
import { TeacherDto } from './dto/teacher.dto';
import * as bcrypt from 'bcrypt';

@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class teachersController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly questionsService: QuestionsService,
    private readonly teachersService: teachersService,
  ) {}

  // -------------------------
  // POST /teachers
  // -------------------------
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async addTeacher(@Body() dto: TeacherDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const teacherData = {
      ...dto,
      passwordHash,
      country: dto.country || 'Unknown',
    };

    return this.teachersService.addteacher(teacherData);
  }

  // -------------------------
  // POST /teachers/:teacherId/exams
  // Safe version preventing NOT NULL errors
  // -------------------------
  @Post(':teacherId/exams')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createExamForTeacher(
    @Param('teacherId') teacherId: number,
    @Body() dto: CreateExamDto,
  ) {
    return this.examsService.addExam(+teacherId, dto);
  }

  // -------------------------
  // POST /teachers/:teacherId/exams/:examId/questions
  // -------------------------
  @Post(':teacherId/exams/:examId/questions')
  @UsePipes(new ValidationPipe({ transform: true }))
  async addQuestionToTeachersExam(
    @Param('teacherId') _teacherId: number,
    @Param('examId') examId: number,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.addQuestionToExam(+examId, dto);
  }

  // -------------------------
  // Optional: Get all exams by teacher
  // -------------------------
  @Get(':teacherId/exams')
  async getExamsByTeacher(@Param('teacherId') teacherId: number) {
    return this.examsService.getExamsByTeacher(+teacherId);
  }
}



/*
  // (Optional UX) GET /teachers/:teacherId/exams
  @Get(':teacherId/exams')
  listExamsOfTeacher(@Param('teacherId') teacherId: number) {
    // Simple example using ExamsService query
    return this.examsService.getExamsByTeacher(+teacherId);
  }*/