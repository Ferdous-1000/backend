import { Body, Controller, Get, Post, Query, Delete, Put, Param,Patch } from "@nestjs/common";
import { teachersService } from "./teachers.service";
import { TeacherDto } from "./dto/teacher.dto";
import { ValidationPipe } from "@nestjs/common";
import { Teacher } from "./teacher.entity"; 

@Controller("teachers")
export class teachersController {
    constructor(private readonly teachersService: teachersService) {}

    @Get('all')
    getteachers(): Promise<Teacher[]> {
        return this.teachersService.getteachers();
    }

    @Get()
    getteachersbyNameandID(
        @Query('name') name: string,
        @Query('id') id: number
    ): Promise<Teacher[]> {
        return this.teachersService.getteachersByNameandID(name, id);
    }

    @Delete('delete/:id')
    deleteteachers(@Param('id') id: number): Promise<string> {
        return this.teachersService.deleteteachers(id);
    }

    @Put('edit/:id')
    editteachers(
        @Param('id') id: number,
        @Body() updatedData: Partial<Teacher>
    ): Promise<string> {
        return this.teachersService.editteachers(id, updatedData);
    }

    @Post("addteacher")
    addteacher(
        @Body(new ValidationPipe()) teachersdata: Partial<Teacher>
    ): Promise<Teacher> {
        return this.teachersService.addteacher(teachersdata);
    }


@Patch('update-country')
updateCountry(
  @Body('id') id: number,
  @Body('country') country: string,
): Promise<{ message: string; teacher: Teacher }> {
  return this.teachersService.updateCountry(id, country);

}
    @Get('by-date')
    getByDate(@Query('date') date: string): Promise<Teacher[]> {
        return this.teachersService.getByJoiningDate(date);
    }


    @Get('default-country')
    getdefaultCountry(): Promise<Teacher[]> {
        return this.teachersService.getWithDefaultCountry();
    }
}
