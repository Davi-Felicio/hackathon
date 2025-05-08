import { Test, TestingModule } from '@nestjs/testing';
import { ArtigosController } from './artigos.controller';

describe('ArtigosController', () => {
  let controller: ArtigosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtigosController],
    }).compile();

    controller = module.get<ArtigosController>(ArtigosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
