import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: string; // e.g., MCQ, Written

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  duration: number; // in minutes
}
