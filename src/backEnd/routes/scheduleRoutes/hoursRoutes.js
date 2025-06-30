import express from "express";
import { updateHoursTable } from "../../dataBase/syncScheduleTables/syncSchedule.js";

const Router = express.Router();

Router.post("/updatehours", express.json(), async (req, res) => {
  const { stepMinutes, initialStartTime, totalSlots } = req.body;
  if (!stepMinutes || !initialStartTime || !totalSlots) {
    return res
      .status(400)
      .json({ error: "Missing required fields (stepMinutes, initialStartTime, totalSlots)" });
  }
  const updated = await updateHoursTable(stepMinutes, initialStartTime, totalSlots);

  if (updated) {
    return res.status(200).json({ message: "Hours updated successfully" });
  } else {
    return res.status(500).json({ error: "Failed to update hours" });
  }
});

export default Router;

