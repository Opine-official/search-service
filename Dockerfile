FROM node:18-alpine AS base

RUN npm install pnpm -g

FROM base AS tsbuilder

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM base AS builder

WORKDIR /usr/src/app

COPY --from=tsbuilder /usr/src/app/dist ./dist
COPY package*.json ./

RUN pnpm install --production

EXPOSE 3003

CMD [ "node", "dist/main.js" ]