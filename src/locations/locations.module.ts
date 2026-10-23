import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service.js';
import { LocationsController } from './locations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { ManagersModule } from '../managers/managers.module.js';
import { Manager } from '../managers/entities/manager.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Manager]), ManagersModule, AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
