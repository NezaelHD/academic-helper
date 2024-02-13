FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

COPY . .

RUN bunx --bun vite build

EXPOSE 3000

CMD ["bun", "start"]