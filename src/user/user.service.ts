import { Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Register } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from "bcrypt";
import { Login } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly logger = new Logger("UserService");
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>,
    private jwtService: JwtService
  ){}

  async create(registerDto: Register) {
    const {password, ...userDetails} = registerDto;
    try{
      const user = this.userRepository.create({
        ...userDetails,
        password: this.encryptPassword(password)
      })
      await this.userRepository.save(user);
      delete user.password;
      
      return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email
      })
    };
    }catch(error){
      this.handleException(error);
    }
  }

  encryptPassword(password:string){
    return bcrypt.hashSync(password, 10);
  }

  private getJwtToken(jwtPayload: JwtPayload){
    const token = this.jwtService.sign(jwtPayload);
    return token;
  }

  async login(loginDto: Login){
    const {email, password} = loginDto;
    const user = await this.userRepository.findOne({
      where: {email},
      select: {email: true, password: true, id: true}
    })

    if(!user) throw new UnauthorizedException(`Email or password incorrect`);

    if(!bcrypt.compareSync(password, user.password!))
      throw new UnauthorizedException(`Email or password incorrect`);

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email
      })
    };
  }

  private handleException(error:any){
          this.logger.error(error);
          if(error.code === '23505'){
              throw new InternalServerErrorException(error.detail);
          }
  }

 
}
