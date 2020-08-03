import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Autor } from 'src/autores/shared/autor.entity';
import { Categoria } from 'src/categorias/shared/categoria.entity';

@Entity()
@Unique(['titulo', 'isbn'])
export class Livro {
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

  @Column("text")
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
  isbn: string;

  @Column({
    nullable: false,
  })
  dataPublicacao: Date;

  @ManyToOne(_type => Categoria, { nullable: false })
  @JoinColumn()
  categoria: Categoria;

  @ManyToOne(_type => Autor, { nullable: false })
  @JoinColumn()
  autor: Autor;
}
