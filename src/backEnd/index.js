import { createServer } from 'node:http';
import express from 'express';
import dotenv from 'dotenv';
import configureStatic from './config/static/configureStatic.js';
import configureCors from './config/cors/corsConfig.js';
import Routes from './routes/routes.js';
import setupSocket from './socket/socket.js';

dotenv.config();
const app = express();
const server = createServer(app);

//cors
configureCors(app);

//archivos estaticos
configureStatic(app);

//rutas
app.use(Routes);

//socket
setupSocket(server);

const port = process.env.PORT || 3000;
const host = process.env.IP || 'localhost';
server.listen(port, host, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});