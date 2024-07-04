FROM node:20-alpine

WORKDIR /home/app

COPY . ./

RUN npm install

EXPOSE 3333

CMD ["npm", "run", "dev"]
