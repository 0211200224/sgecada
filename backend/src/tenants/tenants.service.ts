import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  async create(data: Partial<School>): Promise<School> {
    const school = this.schoolRepository.create(data);
    return this.schoolRepository.save(school);
  }

  async findBySubdomain(subdomain: string): Promise<School | null> {
    return this.schoolRepository.findOne({ where: { subdomain } });
  }

  async findById(id: string): Promise<School | null> {
    return this.schoolRepository.findOne({ where: { id } });
  }
}
