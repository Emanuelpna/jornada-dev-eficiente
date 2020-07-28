import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Post, Body } from '@nestjs/common';

import { CategoriaEntity } from './shared/categoria.entity';
import { NovaCategoriaRequest } from './shared/categoria.request';

// Carga Intrínseca = 2 (CategoriaEntity, NovaCategoriaRequest)
@Controller('categorias')
export class CategoriasController {
  constructor(
    @InjectRepository(CategoriaEntity)
    private readonly categoriaRepository: Repository<CategoriaEntity>,
  ) {}

  // 2
  @Post()
  async saveCategoria(
    @Body() novaCategoria: NovaCategoriaRequest,
  ): Promise<CategoriaEntity> {
    const novaCategoriaValidada = new CategoriaEntity(novaCategoria.nome);

    const categoriaSalvada = await this.categoriaRepository.save(
      novaCategoriaValidada,
    );

    return categoriaSalvada;
  }
}
