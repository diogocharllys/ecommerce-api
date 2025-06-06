import request from 'supertest';
import app from '../app';

let token: string;
let productId: string;

beforeAll(async () => {
  await request(app).post('/auth/register').send({
    name: 'Order User',
    email: 'order@test.com',
    password: '123456',
  });

  const login = await request(app).post('/auth/login').send({
    email: 'order@test.com',
    password: '123456',
  });
  token = login.body.token;

  const productRes = await request(app)
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Produto Pedido',
      price: 50,
      description: 'Produto usado em pedido',
    });

  productId = productRes.body.id;
});

describe('Orders', () => {
  it('deve criar um novo pedido', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          {
            productId,
            quantity: 2,
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('deve listar os pedidos do usuário autenticado', async () => {
    const res = await request(app)
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
