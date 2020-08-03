import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nome'])
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  nome: string;

  constructor(nome: string) {
    this.nome = nome;
  }
}
