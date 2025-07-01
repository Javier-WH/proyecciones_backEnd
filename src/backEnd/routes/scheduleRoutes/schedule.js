import express from "express";
import Schedule from "#models/schedule/schedule.js";

const Router = express.Router();

Router.get("/schedule", async (_, res) => {
  const schedule = await Schedule.findAll({ raw: true });
  if (schedule.length === 0) {
    return res.status(404).json({ error: true, message: "no se encontraron horarios" });
  }
  res.json(schedule);
});

export default Router;

