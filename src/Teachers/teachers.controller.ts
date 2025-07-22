import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { teachersService } from "./teachers.service";

@Controller("teachers")
export class teachersController{
    constructor(private readonly teachersService:teachersService)
    {}

    @Get('all')
    getteachers(){
        return this.teachersService.getteachers();
    }
    getteachersbyNameandID(@Query('name') name:string ,@Query('id') id:number): object {
return this.teachersService.getteachersByNameandID(name,id);
    }

    @Post("addteachers")
   addteachers(@Body() teachersdata: object)  : object{
    return this.teachersService.addteachers(teachersdata);
   }
}