import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { AutorEntity } from 'src/autores/shared/autor.entity';
import { CategoriaEntity } from 'src/categorias/shared/categoria.entity';

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
  isbn: string;

  @Column({
    nullable: false,
  })
  dataPublicacao: Date;

  @ManyToOne(_type => CategoriaEntity, { nullable: false })
  @JoinColumn()
  categoria: CategoriaEntity;

  @ManyToOne(_type => AutorEntity, { nullable: false })
  @JoinColumn()
  autor: AutorEntity;
}
