FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install -g npm@8.18.0
RUN npm install
COPY . .
EXPOSE 8050
CMD ["npm", "start"]