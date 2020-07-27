import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { AutoresModule } from './../src/autores/autores.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: 'Qm40mdzUMoaC!',
          database: 'casadocodigo',
          entities: ['{src, dist}/**/shared/*.entity{.ts,.js}'],
          synchronize: true,
          keepConnectionAlive: true,
        }),
        AutoresModule,
        AppModule,
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/autores (GET)', () => {
    return request(app.getHttpServer())
      .post('/autores')
      .send({
        nome: 'Jorge Amado',
        email: 'autor1@email.com.br',
        descricao: 'Capitães da Areia',
      })
      .expect(400)
      .expect({
        status: 400,
        error: 'Email precisa ser único',
      });
  });
});
