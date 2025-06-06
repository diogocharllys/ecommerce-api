import request from "supertest";
import app from "../app";

let token: string;

beforeAll(async () => {
  await request(app).post("/auth/register").send({
    name: "User",
    email: "product@test.com",
    password: "123456",
  });

  const res = await request(app).post("/auth/login").send({
    email: "product@test.com",
    password: "123456",
  });

  token = res.body.token;
});

describe("Products", () => {
  it("deve criar um produto", async () => {
    const res = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Produto Teste",
        price: 100,
        description: "Produto de teste",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it("deve listar produtos", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
