FROM node:18 as node
FROM oven/bun

WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y openssl

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY package.json .
COPY bun.lockb .

RUN bun install --production

COPY src src
COPY tsconfig.json .
COPY prisma ./prisma/
# COPY public public

RUN bunx prisma generate

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000