FROM node:8.12.0-alpine

WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./
CMD ["npm", "run", "build:server"]

EXPOSE 3000

CMD ["npm", "run", "dev"]

