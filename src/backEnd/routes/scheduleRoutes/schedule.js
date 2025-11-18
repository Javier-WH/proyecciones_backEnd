import express from "express";
import Schedule from "#models/schedule/schedule.js";
import { Op } from "sequelize";

const Router = express.Router();

const checkSchedulePatams = ({ id, name, schedule, proyection_id }, checkId = false) => {
  if (checkId && !id) {
    return { error: true, message: "no se suministro un id" };
  }

  if (!name && !schedule && !proyection_id) {
    return {
      error: true,
      message: "debe suministrar al menos uno de estos datos: name, schedule, proyection_id",
    };
  }

  return { error: false };
};

Router.post("/schedule", express.json(), async (req, res) => {
  try {
    const { id, name, schedule, proyection_id } = req.body;

    // si no tiene id entonces se inserta
    if (!id) {
      const { error, message } = checkSchedulePatams({ name, schedule, proyection_id });
      if (error) {
        return res.status(400).json({ error, message });
      }

      await Schedule.create({ name, schedule, proyection_id });
      return res.status(201).json({ message: "Horario creado correctamente" });
    } else {
      const { error, message } = checkSchedulePatams({ id, name, schedule, proyection_id }, true);
      if (error) {
        return res.status(400).json({ error, message });
      }
      await Schedule.update({ name, schedule, proyection_id }, { where: { id } });
      return res.status(200).json({ message: "Horario actualizado correctamente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar actaulizar o crear el horario" });
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

