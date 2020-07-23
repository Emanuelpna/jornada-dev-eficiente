import { Test, TestingModule } from '@nestjs/testing';
import { AutoresController } from './autores.controller';

describe('Autores Controller', () => {
  let controller: AutoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutoresController],
    }).compile();

    controller = module.get<AutoresController>(AutoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
