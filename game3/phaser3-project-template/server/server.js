const PORT = 3000;
const DOCROOT = './../dist/';

//1 подключить нужные модули http, express, path
const http = require('http');
const path = require('path');
const express = require('express');
const sockets = require('./sockets');

//2 создаем сервер используя express , http
const app = express();
const server = http.createServer(app);

//3 настроить отдачу игры при запросе к серверу
const documentRoot = path.join(__dirname, DOCROOT);
const staticContent = express.static(documentRoot);
app.use(staticContent);

// инициализируем сокеты
sockets.init(server);

// запускаем сервер
server.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});