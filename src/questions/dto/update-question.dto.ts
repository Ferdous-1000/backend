import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString() @IsOptional()
  text?: string;

  @IsString() @IsOptional()
  options?: string;

  @IsString() @IsOptional()
  answer?: string;
}
