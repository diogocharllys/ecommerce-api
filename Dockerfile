FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera o Prisma Client antes do tsc — os tipos dependem disto
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

COPY --from=build /app/src/prisma ./prisma
RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 3000

# Sincroniza o schema do banco antes de iniciar (cria as tabelas no primeiro deploy)
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/server.js"]
