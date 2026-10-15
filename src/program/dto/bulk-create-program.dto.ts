// TODO Reto 3: reglas de validación con class-validator / class-transformer
//   - programs: arreglo NO vacío de CreateProgramDto
//   - cada elemento se debe validar con las mismas reglas de CreateProgramDto

import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { CreateProgramDto } from "./create-program.dto";

//     (pista: @ValidateNested({ each: true }) + @Type(() => CreateProgramDto))
export class BulkCreateProgramDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateProgramDto)
    programs : CreateProgramDto[];

}
