import Proyections from "#models/proyections.js";
import { v4 as uuidv4 } from "uuid";

export default function createProyection(req, res) {
  const { year, name, proyection, teachers, proyections_done } = req.body;

  if (!year || !name || !proyection || !teachers || !proyections_done) {
    return res.status(401).json({ error: "Faltan campos requeridos" });
  }

  try {
    const id = uuidv4();
    Proyections.create({ id, year, name, proyection, teachers, proyections_done });
    res.status(201).json({ message: "Proyeccion creada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la proyections" });
  }
}

