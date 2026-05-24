<h1 align="center">E-commerce API</h1>

<p align="center">
  API REST para uma plataforma de e-commerce — autenticação, catálogo de produtos, carrinho, pedidos e simulação de pagamento — com JWT e documentação Swagger.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License"/>
</p>

---

## 📑 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Stack](#-stack)
- [Modelo de dados](#-modelo-de-dados)
- [Endpoints](#-endpoints)
- [Como rodar](#-como-rodar)
- [Testes](#-testes)
- [O que aprendi](#-o-que-aprendi)

---

## 📋 Sobre

API que implementa o fluxo essencial de um e-commerce: o usuário se cadastra, navega no catálogo, monta um carrinho, cria um pedido e simula o pagamento. Administradores gerenciam o catálogo de produtos. Construída como estudo de **regras de negócio com estado** (carrinho → pedido → pagamento) e **autorização por papel** (cliente/admin).

---

## ✨ Funcionalidades

- 🔐 Cadastro e autenticação de usuários (cliente e admin)
- 📦 CRUD de produtos (restrito a admin)
- 🛒 Carrinho de compras por usuário
- 🧾 Criação e listagem de pedidos
- 💳 Simulação de pagamento de pedidos
- 🛡️ Rotas protegidas por JWT
- 📖 Documentação interativa com Swagger

---

## 🛠️ Stack

| Camada | Tecnologias |
|--------|-------------|
| Runtime / Linguagem | Node.js, TypeScript |
| Web | Express |
| Banco de dados | MySQL via Prisma ORM |
| Autenticação | JWT (jsonwebtoken) + bcrypt |
| Validação | Zod |
| Documentação | Swagger (swagger-jsdoc, swagger-ui-express) |
| Testes | Jest + Supertest |
| Infra | Docker / Docker Compose |

---

## 🗃️ Modelo de dados

`User` · `Product` · `Cart` · `CartItem` · `Order` · `OrderItem`

O carrinho (`Cart`/`CartItem`) é convertido em pedido (`Order`/`OrderItem`) no checkout, preservando os itens e quantidades no momento da compra.

---

## 🔌 Endpoints

> Base URL local: `http://localhost:3000` · Auth via header `Authorization: Bearer <token>`

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/register` | Cadastra um usuário |
| `POST` | `/auth/login` | Login e retorno do JWT |

### Produtos
| Método | Rota | Descrição | Auth |
|--------|------|-----------|:----:|
| `GET` | `/products` | Lista produtos | — |
| `POST` | `/products` | Cria produto | admin |
| `PUT` | `/products/:id` | Atualiza produto | admin |
| `DELETE` | `/products/:id` | Remove produto | admin |

### Carrinho
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/cart` | Ver carrinho do usuário |
| `POST` | `/cart/items` | Adicionar item |
| `PUT` | `/cart/items/:productId` | Atualizar quantidade |
| `DELETE` | `/cart/items/:productId` | Remover item |

### Pedidos
| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/orders` | Criar pedido |
| `GET` | `/orders` | Listar pedidos do usuário |
| `GET` | `/orders/:id` | Detalhar pedido |
| `POST` | `/orders/:id/pay` | Simular pagamento |

> Rotas de carrinho, pedidos, `/private/me` e as mutações de produtos exigem JWT.
> 📖 Especificação interativa completa no Swagger em **`/docs`**.

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 20+
- MySQL (ou Docker)

### Local
```sh
git clone https://github.com/diogocharllys/ecommerce-api.git
cd ecommerce-api
npm install

# Configure o .env com DATABASE_URL e JWT_SECRET
npx prisma migrate deploy

npm run dev
```

### Com Docker
```sh
docker-compose up
```

API em `http://localhost:3000` · docs em `http://localhost:3000/docs`.

### Scripts
| Comando | Ação |
|---------|------|
| `npm run dev` | Desenvolvimento com hot-reload |
| `npm run build` | Compila TypeScript para `dist/` |
| `npm test` | Roda os testes (Jest) |

---

## 🧪 Testes

```sh
npm test
```

Testes de integração com **Jest + Supertest** cobrindo as rotas e regras de negócio.

---

## 📚 O que aprendi

- Modelar um fluxo **com estado** (carrinho → pedido → pagamento) e converter um carrinho em pedido de forma consistente.
- Implementar **autorização por papel** (cliente vs. admin) sobre a autenticação JWT.
- Estruturar rotas e middlewares para proteger recursos sensíveis.
- Documentar a API com **Swagger** e validar entradas com **Zod**.

---

<p align="center">
  <sub>Projeto de estudo e demonstração de boas práticas em APIs Node.js + TypeScript · <a href="https://github.com/diogocharllys">@diogocharllys</a></sub>
</p>
