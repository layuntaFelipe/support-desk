FROM node

WORKDIR /app

COPY . .
COPY ./backend .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "server" ]

#docker build -t nameOfImage:versionOfImage .
#docker run --name nameOfContainer -pXXXX:XXXX -e MONGO_USER=felipe123 -e MONGO_PASS=Felipe123456 -d nameOfImage:versionOfImage