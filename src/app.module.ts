import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { ConfigModule } from '@nestjs/config';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionsModule } from './regions/regions.module.js';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: +process.env.port!,
    username: 'postgres',
    password: process.env.pass,
    database: process.env.name,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }),
    EmployeesModule, ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
