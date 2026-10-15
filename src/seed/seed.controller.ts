import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags("Seed")
@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService){}

    @Get()
    @ApiOperation({ summary: "Run the seed", description: "Deletes all students and inserts the initial data" })
    @ApiOkResponse({ description: "Seed executed", schema: { type: "string", example: "SEED EXECUTED" } })
    executeSeed(){
        return this.seedService.runSeed();
    }
}
