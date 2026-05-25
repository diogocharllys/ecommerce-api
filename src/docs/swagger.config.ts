import swaggerJSDoc from "swagger-jsdoc";

export const swaggerConfig = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API RESTful para gerenciamento de uma plataforma de e-commerce",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // src/*.ts em desenvolvimento, dist/*.js em produção (o container só tem dist/)
  apis: ["src/routes/*.ts", "dist/routes/*.js"],
});
