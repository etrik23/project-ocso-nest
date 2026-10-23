import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../managers/entities/manager.entity.js';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ) { }
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find()
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId: id,
    })
    if (!location) throw new NotFoundException("Location not found")
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    //Set manager to null
    await this.managerRepository
    .createQueryBuilder()
    .update(Manager)
    .set({ location: null as any })
    .where("locationId = :id", {
      id,
    }).execute();

    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });
    if (!location) throw new NotFoundException("Location not found");
    const savedLocation = await this.locationRepository.save(location);

    const updatedManager = await this.managerRepository.preload({
      managerId: updateLocationDto.manager,
      location: location,
    })
    if (updatedManager) {
      await this.managerRepository.save(updatedManager);
    }
    
    return savedLocation;
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id
    })
  }
}
