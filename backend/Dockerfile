# Etapa 1: Build
FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

COPY prisma ./prisma/

RUN yarn install --frozen-lockfile

RUN yarn global add prisma

RUN npx prisma generate --schema ./prisma/schema.prisma

COPY . .

RUN yarn run build

# Etapa 2: Runtime
FROM node:lts-alpine

WORKDIR /usr/src/app

ENV PORT 3333

COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3333

# Comando para rodar a aplicação já compilada
CMD ["node", "dist/main.js"]
