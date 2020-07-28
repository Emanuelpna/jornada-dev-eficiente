import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';
import { AutorEntity } from 'src/autores/shared/autor.entity';
import NovoLivroRequest from './livro.request';

@Entity()
@Unique(['titulo', 'isbn'])
export class LivroEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  titulo: string;

  @Column({
    nullable: false,
    length: 500,
  })
  resumo: string;

  @Column()
  sumario: string;

  @Column({
    nullable: false,
  })
  preco: number;

  @Column({
    nullable: false,
  })
  numeroPaginas: number;

  @Column({
    nullable: false,
  })
  isbn: number;

  @Column({
    nullable: false,
  })
  dataPublicacao: Date;

  @OneToOne(_type => CategoriaEntity, { nullable: false })
  @JoinColumn()
  categoria: CategoriaEntity;

  @OneToOne(_type => AutorEntity, { nullable: false })
  @JoinColumn()
  autor: AutorEntity;

  fromRequest(
    novoLivro: NovoLivroRequest,
    categoria: CategoriaEntity,
    autor: AutorEntity,
  ): void {
    this.titulo = novoLivro.titulo;
    this.resumo = novoLivro.resumo;
    this.sumario = novoLivro.sumario;
    this.preco = novoLivro.preco;
    this.numeroPaginas = novoLivro.numeroPaginas;
    this.isbn = novoLivro.isbn;
    this.dataPublicacao = novoLivro.dataPublicacao;
    this.categoria = categoria;
    this.autor = autor;
  }
}
