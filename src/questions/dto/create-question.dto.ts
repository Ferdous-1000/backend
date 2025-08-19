import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString() @IsNotEmpty()
  text: string;

  @IsString() @IsOptional()
  options?: string;

  @IsString() @IsOptional()
  answer?: string;
}
