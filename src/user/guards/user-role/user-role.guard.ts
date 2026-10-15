import { BadGatewayException, BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/user/decorators/role-protected/role-protected.decorator';
import { User } from 'src/user/entities/user.entity';
import request from 'supertest';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor( private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

    if(!validRoles) return true;

    if(validRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
     const user = request.user as User;

     if(!user) throw new BadRequestException(`user not found`);

     const hasValidRole = user.roles.some(role => validRoles.includes(role));

    if(hasValidRole) return true;

    throw new ForbiddenException(`User ${user.fullName} needs a valid role`)

  }
}
