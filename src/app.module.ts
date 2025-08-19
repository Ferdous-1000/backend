import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { teachersModule } from './Teachers/teachers.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { ExamsModule } from './exams/exams.module';
import { QuestionsModule } from './questions/questions.module';
@Module({
  imports: [teachersModule,  AuthModule,ExamsModule,QuestionsModule,TypeOrmModule.forRoot(
{ type: 'postgres',
host: 'localhost',
port: 5432,
username: 'postgres',
password: '12345678',
database: 'online_quiz',

autoLoadEntities: true,
synchronize: true,
} ),
MailerModule.forRoot({
transport: {
host: 'smtp.gmail.com',
port: 465,
ignoreTLS: true,
secure: true,
auth: {
user: 'ferdousahmedsagor@gmail.com',
pass: 'lzkn xacq wuzr wsip'
},
}
})],
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}
// where: { country: Not('Unknown') }*/