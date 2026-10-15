import { Injectable } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { Student } from '../student/entities/student.entity';
import { CreateStudent } from '../student/dto/create-student.dto';
import { initialData } from './data/seed-student.data';

@Injectable()
export class SeedService {

    constructor(private readonly studentService: StudentService){}

    async runSeed(){
        await this.insertNewStudents();
        return 'SEED EXECUTED';
    }

    private async insertNewStudents(){
        await this.studentService.deleteAllStudents();
        const students = initialData.students;

        const insertPromises: Promise<Student | undefined>[] = [];

        students.forEach(student => {
            insertPromises.push(this.studentService.createStudent(student as CreateStudent));
        });

        await Promise.all(insertPromises);
        return true;
    }
}
