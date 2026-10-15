// TODO Reto 2: reglas de validación con class-validator

import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator";

//   - studentIds: arreglo NO vacío, cada elemento debe ser un UUID
export class AssignStudentsDto {

    @IsArray()
    @ArrayNotEmpty()
    @IsUUID('all', {each : true})
    studentIds: string[];

}
