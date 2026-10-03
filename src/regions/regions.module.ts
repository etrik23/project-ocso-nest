import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service.js';
import { RegionsController } from './regions.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Region]),
    AuthModule,
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
