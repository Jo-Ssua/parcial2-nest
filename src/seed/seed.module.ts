import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { StudentModule } from '../student/student.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [StudentModule]
})
export class SeedModule {}
