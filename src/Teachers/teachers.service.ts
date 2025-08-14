import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual, Between } from "typeorm";
import { Teacher } from "./teacher.entity";

@Injectable()
export class teachersService {
    constructor(
        @InjectRepository(Teacher)
        private readonly teacherRepo: Repository<Teacher>
    ) {}

    async getteachers(): Promise<Teacher[]> {
        return this.teacherRepo.find();
    }

    async getteachersByNameandID(name: string, id: number): Promise<Teacher[]> {
        return this.teacherRepo.find({
            where: { id, country: name },
        });
    }

    async addteacher(data: Partial<Teacher>): Promise<Teacher> {
        const teacher = this.teacherRepo.create(data);
        return this.teacherRepo.save(teacher);
    }

    async deleteteachers(id: number): Promise<string> {
        await this.teacherRepo.delete(id);
        return `Teacher with ID ${id} has been deleted`;
    }

    async editteachers(id: number, updatedData: Partial<Teacher>): Promise<string> {
        await this.teacherRepo.update(id, updatedData);
        return `Teacher with ID ${id} has been edited`;
    }

async updateCountry(id: number, country: string): Promise<{ message: string; teacher: Teacher }> {
    await this.teacherRepo.update(id, { country });

    const teacher = await this.teacherRepo.findOneBy({ id });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return {
      message: `Country updated successfully for teacher ID ${id}`,
      teacher,
    };
  }


    async getByJoiningDate(date: string): Promise<Teacher[]> {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1); 

        return this.teacherRepo.find({
            where: {
                joiningDate: Between(start, end),
            },
        });
    }

    async getWithDefaultCountry(): Promise<Teacher[]> {
        return this.teacherRepo.find({
            where: { country: 'Unknown' },
        });
    }
}
