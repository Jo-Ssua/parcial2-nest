import { Controller,  Post, Body, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import { AuthResponse, SignupResponse } from './dto/auth-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { Test } from './decorators/test.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './enums/valid-roles.enum';
import { Auth } from './decorators/auth.decorator';

@ApiTags("Users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("signup")
  @ApiOperation({ summary: "Register a new user", description: "New users get the teacher role by default" })
  @ApiCreatedResponse({ description: "User was created", type: SignupResponse })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiInternalServerErrorResponse({ description: "Email already registered" })
  create(@Body() registerDto: Register) {
    return this.userService.create(registerDto);
  }

  @Post("auth")
  @ApiOperation({ summary: "Log in", description: "Returns a JWT to use in the Authorize button" })
  @ApiCreatedResponse({ description: "Login successful", type: AuthResponse })
  @ApiBadRequestResponse({ description: "Invalid request body" })
  @ApiUnauthorizedResponse({ description: "Email or password incorrect" })
  login(@Body() loginDto: Login){
    return this.userService.login(loginDto);
  }

  @Post("private")
  @Auth()
  @ApiOperation({ summary: "Test authentication", description: "Only checks that the JWT is valid" })
  @ApiCreatedResponse({ description: "Token is valid", schema: { example: { message: "Done" } } })
  testingAuth(@GetUser() user: User){
    console.log("🚀 ~ :25 ~ UserController ~ testingAuth ~ test:", user)
    return {
      message: "Done"
    }
  }

}
