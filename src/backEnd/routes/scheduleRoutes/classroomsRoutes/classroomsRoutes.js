import express from "express";
import Classrooms from "#models/schedule/classrooms.js";
import { v4 as uuidv4 } from "uuid";
const Router = express.Router();

Router.get("/classrooms", async (_, res) => {
  try {
    const classrooms = await Classrooms.findAll({ raw: true });
    if (classrooms.length === 0) {
      return res.status(404).json({ error: true, message: "no se encontraron aulas de clase" });
    }
    res.status(200).json(classrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "ocurrió un error al intentar obtener las aulas de clase" });
  }
});

Router.post("/classroom", express.json(), async (req, res) => {
  const classroom = req.body.classroom;
  if (!classroom) {
    return res.status(401).json({ error: true, message: "no se suministro un nombre de aula de clase" });
  }
  const id = uuidv4();
  try {
    const existingClassroom = await Classrooms.findOne({ where: { classroom } });
    if (existingClassroom) {
      return res.status(400).json({ error: true, message: "ya existe una aula de clase con ese nombre" });
    }
    await Classrooms.create({ classroom, id });
    res.status(201).json({ message: "aula de clase creada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "ocurrio un error al intentar crear la aula de clase" });
  }
});

Router.delete("/classroom/:id", async (req, res) => {
  const classroomId = req.params.id;
  try {
    const classroom = await Classrooms.findOne({ where: { id: classroomId } });
    if (!classroom) {
      return res.status(404).json({ error: true, message: "aula de clase no encontrada" });
    }
    await Classrooms.destroy({ where: { id: classroomId } });
    res.status(200).json({ message: "aula de clase eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "ocurrio un error al intentar eliminar la aula de clase" });
  }
});

export default Router;

