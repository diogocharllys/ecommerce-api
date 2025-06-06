# E-commerce API

API RESTful para gerenciamento de uma plataforma de e-commerce, desenvolvida com Node.js, Express, TypeScript, Prisma e autenticação JWT. Inclui recursos de cadastro/login, CRUD de produtos, carrinho de compras, pedidos, simulação de pagamento, documentação Swagger e testes automatizados.

## Sumário
- Funcionalidades
- Tecnologias Utilizadas
- Como Rodar o Projeto
- Endpoints Principais
- Testes
- Documentação Swagger
- Docker

## Funcionalidades
- Cadastro e autenticação de usuários (cliente e admin)
- CRUD de produtos
- Gerenciamento de carrinho de compras
- Criação e listagem de pedidos
- Simulação de pagamento de pedidos
- Rotas protegidas por JWT
- Documentação interativa com Swagger
- Testes automatizados com Jest

## Tecnologias Utilizadas
- Node.js
- Express
- TypeScript
- Prisma ORM (MySQL)
- JWT (jsonwebtoken)
- Zod
- Docker & Docker Compose
- Swagger (swagger-jsdoc, swagger-ui-express)
- Jest & Supertest

## Como Rodar o Projeto

### Manualmente (sem Docker)
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o banco de dados MySQL e a variável `DATABASE_URL` no `.env`.
3. Rode as migrations do Prisma:
   ```sh
   npx prisma migrate deploy
   ```
4. Inicie a API:
   ```sh
   npm run build && npm start
   ```

## Endpoints Principais

### Autenticação
- `POST /auth/register` — Cadastro de usuário
- `POST /auth/login` — Login e obtenção do token JWT

### Produtos
- `GET /products` — Listar produtos
- `POST /products` — Criar produto (admin)
- `PUT /products/:id` — Atualizar produto (admin)
- `DELETE /products/:id` — Remover produto (admin)

### Carrinho
- `GET /cart` — Ver carrinho do usuário
- `POST /cart/items` — Adicionar item
- `PUT /cart/items/:productId` — Atualizar quantidade
- `DELETE /cart/items/:productId` — Remover item

### Pedidos
- `POST /orders` — Criar pedido
- `GET /orders` — Listar pedidos do usuário
- `GET /orders/:id` — Detalhar pedido
- `POST /orders/:id/pay` — Simular pagamento

### Rotas protegidas
Incluem `/products` (POST/PUT/DELETE), `/cart`, `/orders` e `/private/me`. Utilize o token JWT no header `Authorization: Bearer <token>`.

## Testes
Execute os testes automatizados com:
```sh
npm test
```

## Documentação Swagger
Acesse a documentação interativa em: [http://localhost:3000/docs](http://localhost:3000/docs)

## Docker
- O projeto inclui docker-compose.yml para subir API e banco MySQL facilmente.
- Variáveis de ambiente podem ser configuradas no arquivo `.env`.

---

> Projeto desenvolvido para fins de estudo e demonstração de arquitetura de APIs modernas com Node.js e TypeScript.