import { Test, TestingModule } from '@nestjs/testing';
import { PedagogicalService } from './pedagogical.service';

describe('PedagogicalService', () => {
  let service: PedagogicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedagogicalService],
    }).compile();

    service = module.get<PedagogicalService>(PedagogicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
