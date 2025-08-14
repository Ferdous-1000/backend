import { Module } from "@nestjs/common";
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
