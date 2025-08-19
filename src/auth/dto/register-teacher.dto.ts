import { IsEmail, IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class RegisterTeacherDto {
  @IsString() @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString() @IsNotEmpty()
  password: string;

  @IsInt() @Min(0)
  phone: number;

  @IsString() @IsNotEmpty()
  country: string;
}
