import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service.js';
import { ManagersController } from './managers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Manager]),
    AuthModule,
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
