FROM node:12

WORKDIR /usr/src/app

RUN npm install -g serve
COPY . .

RUN npm install
CMD npm run build && serve -s build -l 2509