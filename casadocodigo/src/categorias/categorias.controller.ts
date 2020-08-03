import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Post, Body } from '@nestjs/common';

import { Categoria } from './shared/categoria.entity';
import { NovaCategoriaRequest } from './shared/categoria.request';

// Carga Intrínseca = 2 (CategoriaEntity, NovaCategoriaRequest)
@Controller('categorias')
export class CategoriasController {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  // 2
  @Post()
  async saveCategoria(
    @Body() novaCategoria: NovaCategoriaRequest,
  ): Promise<Categoria> {
    const novaCategoriaValidada = new Categoria(novaCategoria.nome);

    const categoriaSalvada = await this.categoriaRepository.save(
      novaCategoriaValidada,
    );

    return categoriaSalvada;
  }
}
