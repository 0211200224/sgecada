import { Test, TestingModule } from '@nestjs/testing';
import { PedagogicalController } from './pedagogical.controller';

describe('PedagogicalController', () => {
  let controller: PedagogicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedagogicalController],
    }).compile();

    controller = module.get<PedagogicalController>(PedagogicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
