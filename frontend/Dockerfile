FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://package-mirror.liara.ir/repository/npm/
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]