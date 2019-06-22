FROM keymetrics/pm2:latest-alpine

WORKDIR /main
COPY . /main

RUN npm install

EXPOSE 4000
EXPOSE 5000
EXPOSE 6000
EXPOSE 7000
EXPOSE 8000
EXPOSE 8080
EXPOSE 9000
EXPOSE 2000

CMD ["pm2-runtime", "start", "process.config.js"]