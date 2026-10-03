import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { ApiAuth } from './decorators/api.decorator.js';

@ApiAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  singup(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }

  @Post("login")
  login(@Body() loginUserDto:LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }
  
  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto:UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }

}
