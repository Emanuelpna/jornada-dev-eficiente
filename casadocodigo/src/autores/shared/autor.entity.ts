import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

import { Autor } from './autor';

@Entity()
export default class AutorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  nome: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 400,
    nullable: false,
  })
  descricao: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataCriado: Date;

  constructor(nome: string, email: string, descricao: string) {
    super();
    this.nome = nome;
    this.email = email;
    this.descricao = descricao;
  }

  toModel(): Autor {
    const autor = new Autor(this.nome, this.email, this.descricao);
    autor.id = this.id;
    autor.dataCriado = this.dataCriado;

    return autor;
  }
}
