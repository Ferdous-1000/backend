/*import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { teachersController } from "./teachers.controller";
import { teachersService } from "./teachers.service";
import { Teacher } from "./teacher.entity";

@Module({
    imports: [
         TypeOrmModule.forFeature([Teacher])
    ],
    controllers: [teachersController],
    providers: [teachersService],
})
export class teachersModule {}
*/
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { teachersService } from './teachers.service';
import { teachersController } from './teachers.controller';
import { ExamsModule } from 'src/exams/exams.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), ExamsModule, QuestionsModule],
  providers: [teachersService],
  controllers: [teachersController],
  exports: [teachersService],
})
export class teachersModule {}
