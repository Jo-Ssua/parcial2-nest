// TODO Reto 1: reglas de validación con class-validator
//   - name: string, mínimo 3 caracteres
//   - code: string de 3 a 6 letras MAYÚSCULAS (ej. "SIS", "MED")

import { IsInt, IsPositive, IsString, IsUppercase, MaxLength, Min, MinLength } from "class-validator";

//   - credits: entero positivo
export class CreateProgramDto {

    @IsString()
    @MinLength(3)
    name : string;

    @IsString()
    @MinLength(3)
    @MaxLength(6)
    @IsUppercase()
    code:string;

    @IsInt()
    @IsPositive()
    credits : number;



}
