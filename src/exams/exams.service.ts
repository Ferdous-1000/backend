/*import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { Question } from '../questions/question.entity';
import { Teacher } from '../Teachers/teacher.entity';
import { CreateExamDto } from './dto/create-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private readonly examRepo: Repository<Exam>,
    @InjectRepository(Question) private readonly questionRepo: Repository<Question>,
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
  ) {}

async addExam(teacherId: number, dto: CreateExamDto): Promise<Exam> {
  const teacher = await this.teacherRepo.findOne({ where: { id: teacherId } });
  if (!teacher) throw new HttpException('Teacher not found', 404);

  const exam = this.examRepo.create({ ...dto, teacher });
  const saved: Exam = await this.examRepo.save(exam); // explicitly typed

  // OPTIONAL: send mail
  // await this.mailer.sendMail({ to: teacher.email, subject: `New exam created: ${saved.title}`, text: `Type: ${saved.type}, Duration: ${saved.duration} min` });

  return saved;
}


  async getExamById(id: number): Promise<Exam> {
    const exam = await this.examRepo.findOne({ where: { id }, relations: ['questions'] });
    if (!exam) throw new NotFoundException(`Exam ${id} not found`);
    return exam;
  }

  async getExamByType(type: string): Promise<Exam[]> {
    return this.examRepo.find({ where: { type }, relations: ['questions'] });
  }

  async getExamsByTeacher(teacherId: number): Promise<Exam[]> {
    return this.examRepo.find({ where: { teacher: { id: teacherId } }, relations: ['questions'] });
  }

  async updateExamTime(id: number, duration: number): Promise<Exam> {
    const exam = await this.examRepo.findOne({ where: { id } });
    if (!exam) throw new NotFoundException(`Exam ${id} not found`);
    exam.duration = duration;
    return this.examRepo.save(exam);
  }

  async deleteExam(id: number) {
    const result = await this.examRepo.delete(id);
    if (!result.affected) throw new NotFoundException(`Exam ${id} not found`);
    return { message: 'Exam deleted' };
  }
}*/
import { Injectable, HttpException,NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './exam.entity';
import { Teacher } from '../Teachers/teacher.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
     private readonly mailer: MailerService, 
  ) {}

  // Add a single exam for a teacher
  async addExam(teacherId: number, dto: CreateExamDto): Promise<Exam> {
    const teacher = await this.teacherRepo.findOne({ where: { id: teacherId } });
    if (!teacher) throw new HttpException('Teacher not found', 404);

    const exam = this.examRepo.create({ ...dto, teacher });
    const saved: Exam = await this.examRepo.save(exam); // explicitly typed as single Exam

    //Optional: send mail
     await this.mailer.sendMail({
       to: teacher.email,
       subject: `New exam created: ${saved.title}`,
      text: `Type: ${saved.type}, Duration: ${saved.duration} min`,
     });

    return saved;
  }
  // ✅ NEW: Get all exams created by a specific teacher
  async getExamsByTeacher(teacherId: number): Promise<Exam[]> {
    const teacher = await this.teacherRepo.findOne({ where: { id: teacherId } });
    if (!teacher) throw new NotFoundException(`Teacher with ID ${teacherId} not found`);

    return this.examRepo.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }
  // Get all exams
  async getAllExams(): Promise<Exam[]> {
    const exams: Exam[] = await this.examRepo.find({ relations: ['teacher'] });
    return exams;
  }

  // Get a single exam by ID
  async getExamById(id: number): Promise<Exam> {
    const exam: Exam | null = await this.examRepo.findOne({
      where: { id },
      relations: ['teacher'],
    });
    if (!exam) throw new HttpException('Exam not found', 404);
    return exam;
  }

  // Optional: update exam
  async updateExam(id: number, dto: Partial<CreateExamDto>): Promise<Exam> {
    const exam = await this.getExamById(id);
    Object.assign(exam, dto);
    const updated: Exam = await this.examRepo.save(exam); // single Exam
    return updated;
  }

  // Optional: delete exam
  async deleteExam(id: number): Promise<{ message: string }> {
    const result = await this.examRepo.delete(id);
    if (result.affected === 0) throw new HttpException('Exam not found', 404);
    return { message: 'Exam deleted successfully' };
  }
}

