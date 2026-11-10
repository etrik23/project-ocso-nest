import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, BadRequestException, Query } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { ApiAuth } from './decorators/api.decorator.js';
import { ApiTags } from '@nestjs/swagger';
import { TOKEN_NAME } from './constants/jwt.constants.js';
import type { Response } from 'express';
import { Cookies } from './decorators/cookies.decorator.js';

@ApiAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }



  @Post("register/:id")
  registerManager(
    @Query("role") role: string,
    @Body() createUserDto: CreateUserDto,
    @Param("id") id: string
  ) {
    if (role === "manager") {
      return this.authService.registerManager(id, createUserDto)
    } else if (role === "employee") {
      return this.authService.registerEmployee(id, createUserDto)
    }
    throw new BadRequestException("Rol invalido");
  }




  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response, @Cookies() cookies: any) {
    const token = await this.authService.loginUser(loginUserDto)
    response.cookie(TOKEN_NAME, token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return;
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(userEmail, updateUserDto)
  }

}
