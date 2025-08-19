import { IsInt, Min } from 'class-validator';

export class UpdateExamTimeDto {
  @IsInt() @Min(1)
  duration: number;
}
