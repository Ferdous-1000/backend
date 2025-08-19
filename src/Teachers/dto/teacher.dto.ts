import { IsString, IsNotEmpty, Matches, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class TeacherDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Full name should only contain letters and spaces' })
  fullName: string;

  @IsNumber({}, { message: 'Phone must be a number' })
  phone: number;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/[@#$&]/, { message: 'Password must contain at least one special character (@, #, $, &)' })
  password: string;

  @IsOptional()
  @IsString()
  country?: string; // optional, defaults to 'Unknown'
}
