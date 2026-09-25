import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto.js';
import { UpdateRegionDto } from './dto/update-region.dto.js';
import { isConstructor } from '@nestjs/common/internal';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity.js';
import { Repository } from 'typeorm/browser';

@Injectable()
export class RegionsService {

  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ){}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId: id
    })
    if (!Region) throw new NotFoundException("Region not found")
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })
    if (!regionToUpdate) throw new BadRequestException()
      return this.regionRepository.save(regionToUpdate);
  }

  remove(id: number) {
    return this.regionRepository.delete({
      regionId: id,
    })
  }
}
