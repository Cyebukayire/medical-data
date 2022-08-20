FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g npm@8.13.2
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]