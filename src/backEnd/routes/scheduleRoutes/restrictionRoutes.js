import express from "express";
import SubjectRestrictions from "#models/schedule/subjectsRestrictions.js";
import TeachersRestrictions from "#models/schedule/teacherRestrictions.js";

const Router = express.Router();

Router.post("/teacherRestriction", express.json(), async (req, res) => {
  try {
    const { teacher_id, restrictions } = req.body;

    if (!teacher_id) {
      return res
        .status(400)
        .json({ error: true, message: "Debe suministrar un ID para el profesor (teacher_id)" });
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

Router.get("/teacherRestriction", async (req, res) => {
  try {
    const { teacher_id } = req.query;

    if (!teacher_id) {
      return res
        .status(400)
        .json({ error: true, message: "Debe suministrar el ID del profesor (teacher_id)" });
    }

    const restriction = await TeachersRestrictions.findOne({ where: { teacher_id } });

    if (!restriction) {
      return res.status(404).json({ error: true, message: "Restricción no encontrada para el profesor" });
    }

    return res.json(restriction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor al buscar la restricción" });
  }
});

Router.post("/subjectRestriction", express.json(), async (req, res) => {
  try {
    const { subject_id, restrictions } = req.body;

    if (!subject_id) {
      return res
        .status(400)
        .json({ error: true, message: "Debe suministrar un ID para para la materia (subject_id)" });
    }

    if (restrictions === undefined || restrictions === null) {
      return res.status(400).json({ error: true, message: "Debe suministrar las restricciones" });
    }

    const [_restrictionRecord, created] = await SubjectRestrictions.upsert(
      { subject_id, restrictions },
      { where: { subject_id } }
    );

    const statusCode = created ? 201 : 200;
    const action = created ? "creó" : "actualizó";

    return res.status(statusCode).json({
      message: `La restricción de la materia se ${action} correctamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al intentar crear o actualizar una restricción para la materia" });
  }
});

export default Router;

