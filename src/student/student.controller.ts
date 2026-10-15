import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudent } from './dto/create-student.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ValidRoles } from 'src/user/enums/valid-roles.enum';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Student } from './entities/student.entity';

@ApiTags("Students")
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Auth(ValidRoles.teacher)
  @ApiOperation({ summary: "Create a student", description: "Requires the teacher role" })
  @ApiCreatedResponse({ description: "Student was created", type: Student })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiInternalServerErrorResponse({ description: "Email already registered" })
  create(@Body() createStudentDto: CreateStudent){
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: "List students", description: "Supports pagination with limit and skip" })
  @ApiOkResponse({ description: "Student's list", type: [Student] })
  @ApiBadRequestResponse({ description: "Invalid pagination params" })
  findAll(@Query() PaginationDto: PaginationDto){
    return this.studentService.findAll(PaginationDto);
  }

  @Get(":term")
  @ApiOperation({ summary: "Find a student", description: "Search by id (UUID), name or nickname" })
  @ApiParam({ name: "term", description: "Student id, name or nickname", example: "gus21" })
  @ApiOkResponse({ description: "Student found", type: Student })
  @ApiNotFoundResponse({ description: "Student not found" })
  findOne(@Param("term") term: string){
    return this.studentService.findOne(term);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a student", description: "If grades are sent, they replace the existing ones" })
  @ApiParam({ name: "id", description: "Student id (UUID)", format: "uuid" })
  @ApiOkResponse({ description: "Student was updated", type: Student })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiNotFoundResponse({ description: "Student not found" })
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto){
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(":id")
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: "Delete a student", description: "Requires the admin role" })
  @ApiParam({ name: "id", description: "Student id (UUID)", format: "uuid" })
  @ApiOkResponse({ description: "Student was deleted" })
  @ApiNotFoundResponse({ description: "Student not found" })
  remove(@Param("id") id: string){
    return this.studentService.removeStudent(id);
  }

}
