FROM node:18-alpine

WORKDIR /app

EXPOSE 3000

COPY . .

RUN yarn install

ENTRYPOINT ["yarn", "start"]
