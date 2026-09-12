import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { v4 as uuid} from "uuid";
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({
      employeeId: id
    })
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    this.employeeRepository.save(employeeToUpdate!)
    return employeeToUpdate;
  }

  remove(id: string) {
    this.employeeRepository.delete({
      employeeId: id
    })
    return{
      message: "employee delete"
    }
  }
}
