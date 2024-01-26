FROM node:20-alpine3.19

EXPOSE 3001

WORKDIR /app

COPY package*.json .
COPY . .

RUN npm i

ENTRYPOINT [ "npm", "run" ]
CMD ["dev"]
