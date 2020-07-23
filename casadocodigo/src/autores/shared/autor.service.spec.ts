import { Test, TestingModule } from '@nestjs/testing';
import { AutorService } from './autor.service';

describe('AutorService', () => {
  let provider: AutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutorService],
    }).compile();

    provider = module.get<AutorService>(AutorService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
