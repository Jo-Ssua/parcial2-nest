import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Grades } from './entities/grades.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [StudentController],
  imports:[
    TypeOrmModule.forFeature([Student, Grades]),
    UserModule
  ],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
