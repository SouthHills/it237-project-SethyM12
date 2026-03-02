FROM node:20-alpine AS builder

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /src/dist/angular-site /app

EXPOSE 4000

CMD ["node", "server/server.mjs"]
