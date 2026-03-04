FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist/angular-site ./

COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 4200

CMD ["node", "server/server.mjs"]
