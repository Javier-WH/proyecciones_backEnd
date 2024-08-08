import express from "express";
const Router = express.Router();
import { fileURLToPath } from 'url';
import path from "path";


// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontEnd', 'index.html'));
})  

export default Router