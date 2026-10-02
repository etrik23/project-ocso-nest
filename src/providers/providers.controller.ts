import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { UserData } from '../auth/decorators/user.decorator.js';
import { User } from '../auth/entities/user.entity.js';
import { Auth } from '../auth/decorators/auth.decorator.js';


@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth("Employee")
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado, solo admins y managers");
    return this.providersService.findAll();
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string){
    return this.providersService.findOneByName(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
    return provider
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
