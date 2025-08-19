import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Teacher } from '../Teachers/teacher.entity';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterTeacherDto) {
    const existing = await this.teacherRepo.findOne({ where: { email: dto.email } });
    if (existing) throw new HttpException('Email already in use', 409);

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const teacher = this.teacherRepo.create({
      email: dto.email,
      passwordHash,
      fullName: dto.fullName,
      phone: dto.phone,
      country: dto.country,
    });
    const saved = await this.teacherRepo.save(teacher);
    return { id: saved.id, email: saved.email, fullName: saved.fullName };
  }

  async validate(email: string, pass: string): Promise<Teacher | null> {
    const teacher = await this.teacherRepo.findOne({ where: { email } });
    if (!teacher) return null;
    const ok = await bcrypt.compare(pass, teacher.passwordHash);
    return ok ? teacher : null;
    }

  async login(dto: LoginDto) {
    const teacher = await this.validate(dto.email, dto.password);
    if (!teacher) throw new HttpException('Invalid credentials', 401);
    const payload = { sub: teacher.id, email: teacher.email };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
