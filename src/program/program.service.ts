import { ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from './entities/program.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { PaginationDto } from 'src/student/dto/pagination.dto';
import { AssignStudentsDto } from './dto/assign-students.dto';
import { BulkCreateProgramDto } from './dto/bulk-create-program.dto';
import { isUUID } from 'class-validator';
import { Student } from 'src/student/entities/student.entity';

@Injectable()
export class ProgramService {
    private readonly logger = new Logger("ProgramService");


    // TODO Reto 1: inyecta el repositorio de Program (y lo que necesites para las transacciones)
    constructor(
        @InjectRepository(Program)
        private readonly programRepository : Repository<Program>,
        @InjectRepository(Student)
        private readonly studentRepository : Repository<Student>,
        private readonly datasource : DataSource,
    ){}

    // TODO Reto 1: create(createProgramDto, user) -> guarda el programa
    //   - nombre o código repetido -> 409 Conflict (no 500)
     async createProgram(createProgramDto : CreateProgramDto, user : User): Promise<Program | undefined>{
        try{
            const {name} = createProgramDto;
            const existing = await this.programRepository.findOneBy({name});
            if(existing){
                throw new ConflictException('Program already registed')
            }

            const createdClub = await this.programRepository.create({
                ...createProgramDto,
                createdBy: user
            
            });

            return this.programRepository.save(createdClub);
        }catch(error){
             this.handleException(error);
        }
    }

    // TODO Reto 1: findAll(paginationDto) -> lista paginada (limit / skip)
     async findAll(paginationDto : PaginationDto){
        try {
            const {skip, limit} = paginationDto;
            return await this.programRepository.find({
                take:limit,
                skip: skip
            });            
        } catch (error) {
            this.handleException(error);
            
        }
    }


    // TODO Reto 2: findOne(id) -> programa con sus estudiantes, 404 si no existe
    async findOne(id : string){
        try {
            if(isUUID(id)){
               const program = await this.programRepository.findOneBy({id});
               if(!program){
                    throw new NotFoundException(`Program with ${id} not found`);
                }
                return program;
            }           
            
        } catch (error) {
            this.handleException(error);
            
        }
    }


    // TODO Reto 2: assignStudents(id, assignStudentsDto) -> AGREGA estudiantes al programa
    //   dentro de una transacción (QueryRunner), conservando los que ya tenía.
    //   Mismo patrón del update de estudiantes corregido en clase (combinar las notas):
    //   traer los actuales -> combinar con los nuevos -> guardar la lista completa.
    //   Si algún id no existe: 404 y rollback.

    async assignStudents(id : string, assignStudentsDto : AssignStudentsDto){
        const queryRunner = this.datasource.createQueryRunner();
        const {studentIds} = assignStudentsDto;

        try{

            const program = await this.programRepository.findOneBy({id});

            if(!program){
                throw new NotFoundException(`No existe el club con id ${id}`);
            }
            const queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
     

            if(studentIds){

                const currentStudents = await queryRunner.manager.find(Student, {
                    where: {program : {id}}
                    }
                )
                for (const newStudent of studentIds){
                    const existing = currentStudents.find(
                        student => student.id === newStudent
                    );

                    if(existing) {
                        existing.program = program
                    }else{
                        const student = await this.studentRepository.findOneBy({id: newStudent});
                        if(student){
                            currentStudents.push(student);

                        }
                        
                    }


                }

                program.students = currentStudents;

                
            }

            await queryRunner.manager.save(program);
            await queryRunner.commitTransaction();
            await queryRunner.release();


            return await this.findOne(program.id);




        }catch(error){
            if(queryRunner.isTransactionActive){
                await  queryRunner.rollbackTransaction();
            }
            this.handleException(error);
        }finally{
            await queryRunner.release();
        }

        
    }

    // TODO Reto 3: bulkCreate(bulkCreateProgramDto, user) -> crea todos los programas o ninguno
    //   (transacción). Cualquier nombre/código repetido -> 409 y rollback.
    async bulkCreate(bulkCreateProgramDto : BulkCreateProgramDto, user : User){
        const queryRunner = this.datasource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const {programs} = bulkCreateProgramDto;
        

            for (const program of programs){
                const {name,code} = program;
                const existingProgram = await queryRunner.manager.findOneBy(Program,{name, code});

                if(existingProgram){
                    throw new ConflictException(`Program with name ${name} and ${code} already exists`)
                }
                
                const programToSave = await queryRunner.manager.create(Program, {
                    ...program,
                    createdBy : user
                })
                await queryRunner.manager.save(programToSave);

            }

            await queryRunner.commitTransaction();
            await queryRunner.release();

        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            this.handleException(error);
        }
    }




     private handleException(error:any): never{
        if(error instanceof HttpException) throw error;

        if(error.code === '23505'){
            throw new ConflictException(error.detail);
        }

        this.logger.error(error);
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }
}
