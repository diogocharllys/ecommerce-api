FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
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
CMD ["node", "dist/server.js"]
