import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateStudent } from './dto/create-student.dto';
import { PaginationDto } from './dto/pagination.dto';
import { isUUID } from 'class-validator';
import { Grades } from './entities/grades.entity';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {

    private readonly logger = new Logger("StudentService");

    constructor(
        @InjectRepository(Grades)
        private readonly gradesRepository: Repository<Grades>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        private datasource: DataSource
    ){}

    async createStudent(createStudentDto: CreateStudent): Promise<Student | undefined>{
        try{
            const {grades = [], ...studentDetails} = createStudentDto;
            const student = this.studentRepository.create({
                ...studentDetails,
                grades: grades.map( grade => this.gradesRepository.create(grade))
            });
            await this.studentRepository.save(student);
            return student;
        }catch(error){
            this.handleException(error);
        }
    }

    async findAll(paginationDto: PaginationDto){
        try{
            const {skip, limit} = paginationDto;
            return await this.studentRepository.find({
                take: limit,
                skip: skip
            });
        }catch(error){
            this.handleException(error);
        }
    }

    async findOne(term: string){
        let student: Student | null;
        try{
            if(isUUID(term)) {
                student = await this.studentRepository.findOneBy({ id: term});
            }else{
                const queryBuilder = this.studentRepository.createQueryBuilder("student");
                student = await queryBuilder.where("UPPER(name)=:name or nickname=:nickname", {
                    name: term.toUpperCase(),
                    nickname: term.toLowerCase()
                })
                .leftJoinAndSelect("student.grades", "studentGrades")
                .getOne()
            }
            
            if(!student)
                throw new NotFoundException(`Student with ${term} not found`);

            return student;

        }catch(error){
            this.handleException(error);
        }
    }

    async update(id: string, updateStudentDto: UpdateStudentDto){
        const {grades, ...studentDetails} = updateStudentDto;
        const student = await this.studentRepository.preload({
            id: id,
            ...studentDetails
        })

        if(!student) throw new NotFoundException(`Student with id ${id} not found`);

        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            if(grades){
                student.grades = grades.map( grade => this.gradesRepository.create(grade));
                await queryRunner.manager.delete(Grades, {student:{id}});

            }

            await queryRunner.manager.save(student);
            await queryRunner.commitTransaction();
            await queryRunner.release();

            return await this.findOne(student.id);

        }catch(error){
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleException(error);
        }

    }

    async removeStudent(id: string){
        const student = await this.findOne(id);
        if(!student) throw new NotFoundException(`Student with id ${id} not found`);
        await this.studentRepository.remove(student);
    }

    deleteAllStudents(){
    const query = this.studentRepository.createQueryBuilder();
    try{
      return query.delete()
                        .execute();
    }catch(error){
      this.handleException(error);
    }
  }

    private handleException(error:any){
        this.logger.error(error);
        if(error.code === '23505'){
            throw new InternalServerErrorException(error.detail);
        }
    }
}
