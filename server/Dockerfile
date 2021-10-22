
FROM node:14.16.0-alpine3.10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy ts-node typescript -g

RUN npm install

COPY . .

RUN tsc

CMD ["npm", "run", "dev"]