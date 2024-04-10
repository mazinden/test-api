'use strict';

const path = require('path');
const http = require('http');
const oas3Tools = require('oas3-tools');
const serverPort = 8080;

// Получаем конфигурацию приложения Express с помощью oas3-tools
const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
});

const app = expressAppConfig.getApp();

// Теперь, когда у нас есть экземпляр приложения Express, мы можем использовать CORS middleware
const cors = require('cors');
app.use(cors()); // Включаем CORS для всех доменов/источников

// Initialize the Swagger middleware и запускаем сервер
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});
