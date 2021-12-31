FROM node:slim

RUN mkdir -p /app
COPY . /app
WORKDIR /app
EXPOSE 3000

ENV NODE_OPTIONS=--openssl-legacy-provider
RUN yarn install
CMD yarn start

