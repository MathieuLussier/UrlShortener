FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm install pm2 -g
RUN ng build --prod
CMD [ "pm2-runtime", "./server/app.js" ]