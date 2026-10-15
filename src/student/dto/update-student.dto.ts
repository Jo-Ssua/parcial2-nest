import { PartialType } from "@nestjs/swagger";
import { CreateStudent } from "./create-student.dto";

export class UpdateStudentDto extends PartialType(CreateStudent){}
