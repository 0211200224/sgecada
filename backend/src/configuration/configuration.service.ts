import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolConfig } from './entities/configuration.entity';

@Injectable()
export class ConfigurationService {
  constructor(
    @InjectRepository(SchoolConfig)
    private readonly configRepository: Repository<SchoolConfig>,
  ) {}

  async getConfig(school_id: string): Promise<SchoolConfig> {
    let config = await this.configRepository.findOne({ where: { school_id } });
    
    if (!config) {
      // Inicializa configuração padrão se não existir
      config = this.configRepository.create({ school_id });
      await this.configRepository.save(config);
    }
    
    return config;
  }

  async updateConfig(school_id: string, data: Partial<SchoolConfig>): Promise<SchoolConfig> {
    const config = await this.getConfig(school_id);
    Object.assign(config, data);
    return this.configRepository.save(config);
  }
}
