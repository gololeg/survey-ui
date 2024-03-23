FROM node:18-alpine

WORKDIR /app

EXPOSE 9000

COPY /package.json /app/package.json
COPY /package.json /.
COPY /yarn.lock /yarn.lock

RUN yarn install

COPY . /.

CMD ["yarn", "start"]