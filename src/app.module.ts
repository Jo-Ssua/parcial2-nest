import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { ProgramModule } from './program/program.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true //Solo usarla en ambientes bajos, no usar en prod
    }),
    StudentModule,
    UserModule,
    SeedModule,
    // TODO Reto 1: registra aquí el ProgramModule
    ProgramModule,


  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
