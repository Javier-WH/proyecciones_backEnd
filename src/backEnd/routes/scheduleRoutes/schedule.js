import express from "express";
import Schedule from "#models/schedule/schedule.js";
import { Op } from "sequelize";

const Router = express.Router();

Router.post("/schedule", express.json(), async (req, res) => {
  try {
    const inserLlist = req.body.schedule.filter((item) => item.id === undefined);

    if (!inserLlist || inserLlist.length === 0) {
      return res.status(400).json({ error: "La lista de horarios es obligatoria" });
    }
    await Schedule.bulkCreate(inserLlist);
    res.status(201).json({ message: "Horarios agregados correctamente" });
  } catch (error) {
    // Manejo específico para errores de restricción única
    if (error.name === "SequelizeUniqueConstraintError") {
      const camposDuplicados = error.errors.map((err) => err.path).join(", ");
      return res.status(409).json({
        error: "Conflicto de datos únicos",
        message: `Ya existen registros con los mismos valores en: ${camposDuplicados}`,
        detalles: error.errors.map((e) => ({
          campo: e.path,
          valor: e.value,
          mensaje: e.message,
        })),
      });
    }

    // Manejo de otros errores
    console.error("Error al agregar horarios:", error);
    res.status(500).json({
      error: "Error al intentar agregar los horarios",
      detalle: error.message,
    });
  }
});

/*
Router.get("/schedule", async (_, res) => {
  const schedule = await Schedule.findAll({ raw: true });
  if (schedule.length === 0) {
    return res.status(404).json({ error: true, message: "no se encontraron horarios" });
  }
  res.json(schedule);
});

Router.delete("/schedule", async (req, res) => {
  try {
    await Schedule.destroy({ where: { id: { [Op.ne]: null } } });
    res.status(200).json({ messages: "Horarios eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar eliminar los horarios" });
  }
});



Router.delete("/", async (req, res) => {
  try {
    await Schedule.destroy({ where: { id: { [Op.ne]: null } } });
    res.status(200).json({ messages: "Horarios eliminados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar eliminar los horarios" });
  }
});*/

export default Router;

