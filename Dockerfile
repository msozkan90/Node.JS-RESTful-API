FROM node:16-buster

RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
