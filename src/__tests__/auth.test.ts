import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

describe('Auth', () => {
  afterAll(async () => await prisma.$disconnect());

  it('deve registrar e fazer login de um novo usuário', async () => {
    const resRegister = await request(app)
      .post('/auth/register')
      .send({
        name: 'Usuário Teste',
        email: 'teste@example.com',
        password: '123456',
      });
    expect(resRegister.statusCode).toBe(201);

    const resLogin = await request(app)
      .post('/auth/login')
      .send({
        email: 'teste@example.com',
        password: '123456',
      });
    expect(resLogin.statusCode).toBe(200);
    expect(resLogin.body.token).toBeDefined();
  });
});
