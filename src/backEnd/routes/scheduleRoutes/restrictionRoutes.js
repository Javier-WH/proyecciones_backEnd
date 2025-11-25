import express from "express";
import SubjectRestrictions from "#models/schedule/subjectsRestrictions.js";
import TeachersRestrictions from "#models/schedule/teacherRestrictions.js";

const Router = express.Router();

Router.post("/teacherRestriction", express.json(), async (req, res) => {
  try {
    const { teacher_id, restrictions } = req.body;

    if (!teacher_id) {
      return res.status(400).json({ error: true, message: "Debe suministrar un ID para el profesor" });
    }

    if (restrictions === undefined || restrictions === null) {
      return res.status(400).json({ error: true, message: "Debe suministrar las restricciones" });
    }

    const [_restrictionRecord, created] = await TeachersRestrictions.upsert(
      { teacher_id, restrictions },
      { where: { teacher_id } }
    );

    const statusCode = created ? 201 : 200;
    const action = created ? "creó" : "actualizó";

    return res.status(statusCode).json({
      message: `La restricción del profesor se ${action} correctamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar crear o actualizar una restricción para profesor" });
  }
});

/*Router.get("/schedule", async (req, res) => {
  const { id } = req.query;

  if (id) {
    const schedule = await Schedule.findOne({ where: { id } });
    if (!schedule) {
      return res.status(404).json({ error: true, message: "horario no encontrado" });
    }
    return res.json(schedule);
  }
  const schedule = await Schedule.findAll({ raw: true });
  if (schedule.length === 0) {
    return res.status(404).json({ error: true, message: "no se encontraron horarios" });
  }
  res.json(schedule);
});*/

export default Router;

