FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g npm@8.18.0
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]