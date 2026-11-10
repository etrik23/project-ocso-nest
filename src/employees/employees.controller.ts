/// <reference types="multer" />
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { ROLES } from '../auth/constants/roles.constants.js';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity.js';
import { ApiAuth } from '../auth/decorators/api.decorator.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AwsService } from '../aws/aws.service.js';
@ApiBearerAuth()
@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService,
    private readonly awsService: AwsService
  ) { }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName: "Cedric",
      employeeEmail: "cedric@gmail.com",
      employeeLastName: "Castro",
      employeePhoneNumber: "4423669381"
    } as Employee
  })


  @Post()
  @UseInterceptors(FileInterceptor('employeePhoto'))
  async create(@Body() createEmployeeDto: CreateEmployeeDto, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return this.employeesService.create(createEmployeeDto);
    } else {
      const photoUrl = await this.awsService.uploadFile(file)
      createEmployeeDto.employeePhoto = photoUrl;
      return this.employeesService.create(createEmployeeDto)
    }
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    const response = await this.awsService.uploadFile(file)
    return this.employeesService.update(id, {
      employeePhoto: response
    })
  }

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }



  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string
  ) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @UseInterceptors(FileInterceptor("employeePhoto"))
  @Patch('/:id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || file.size === 0) {
      return this.employeesService.update(id, updateEmployeeDto);
    } else {
      const fileUrl = await this.awsService.uploadFile(file);
      updateEmployeeDto.employeePhoto = fileUrl;
      return this.employeesService.update(id, updateEmployeeDto);
    }
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string
  ) {
    return this.employeesService.remove(id);
  }
}
