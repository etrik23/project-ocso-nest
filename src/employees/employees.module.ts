import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { EmployeesController } from './employees.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { AwsModule } from '../aws/aws.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    AwsModule,
    AuthModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
