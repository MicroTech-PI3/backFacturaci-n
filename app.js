import express, { json } from "express";
import {router} from "./routes/routes.js";
import createError from "http-errors"; // Importa el módulo para manejar situaciones de error HTTP
import cors from "cors"; // Importa el módulo CORS para habilitar el intercambio de recursos entre diferentes dominios en el navegador web.
import http from "http";
import path from 'path';
import { fileURLToPath } from 'url';


import { APP_PORT, APP_HOST } from "./config.js";

export const app = express(); // --> Iniciamos express
app.use(json());
app.disable("x-powered-by"); // --> Deshabilitar el header x-powered-by

//permite conexiones de cualquier url
app.use(cors());

//configaron de middleware adicional para el registro, analisis de JSON, formularios y cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enrutador principal, todo lo que llegue a la raiz sera manejado por el indexRouter
app.use("/", router);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, 'public')));

// error 404 (no encontrado)
app.use(function (req, res, next) {
  res.status(404).send('not found!!')
});

// PORT

http.createServer(app).listen(APP_PORT);
console.log("Server on port", APP_HOST, APP_PORT);
