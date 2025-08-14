import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { teachersModule } from './Teachers/teachers.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [teachersModule,TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '12345678',
database: 'online_quiz',

autoLoadEntities: true,
synchronize: true,
} ),],
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}
// where: { country: Not('Unknown') }