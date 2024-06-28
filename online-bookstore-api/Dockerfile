FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000
#run db script and then start the app
CMD ["npm", "run", "dev"]
