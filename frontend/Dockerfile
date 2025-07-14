FROM node:latest

WORKDIR /project

COPY . /project

RUN npm install

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
