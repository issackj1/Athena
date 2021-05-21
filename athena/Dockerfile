# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent --only=production
RUN npm install
COPY .. ./

EXPOSE 4000
CMD ["node", "./bin/www"]
