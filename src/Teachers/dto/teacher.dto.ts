
import {IsString,Matches,IsNotEmpty,IsDateString,IsUrl,} from 'class-validator';

export class TeacherDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name should only contain letters and spaces',
  })
  Name: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/[@#$&]/, {
    message: 'Password must contain at least one special character (@, #, $ or &)',
  })
  Password: string;


  @IsDateString({}, { message: 'invalid date' })
  Joining_date: string;

  @IsUrl({}, { message: 'Social media link must be a valid URL' })
  Social_Link: string;
}