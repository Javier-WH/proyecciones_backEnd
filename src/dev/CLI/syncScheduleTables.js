#!/usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import sequelize from "../../backEnd/dataBase/connection/ORMconnection.js";
import Classrooms from "../../backEnd/dataBase/models/schedule/classrooms.js";
import Days from "../../backEnd/dataBase/models/schedule/days.js";
import Hours from "../../backEnd/dataBase/models/schedule/hours.js";
import Schedule from "../../backEnd/dataBase/models/schedule/schedule.js";
import SubjectRestrictions from "../../backEnd/dataBase/models/schedule/subjectsRestrictions.js";
import TeachersRestrictions from "../../backEnd/dataBase/models/schedule/teacherRestrictions.js";

async function syncSchedules() {
  try {
    console.log("Sincronizando tablas de schedule (no se borrarán tablas existentes)...");
    await Classrooms.sync({ alter: true });
    console.log("classrooms sincronizada");
    await Days.sync({ alter: true });
    console.log("days sincronizada");
    await Hours.sync({ alter: true });
    console.log("hours sincronizada");
    await SubjectRestrictions.sync({ alter: true });
    console.log("subjects_restrictions sincronizada");
    await TeachersRestrictions.sync({ alter: true });
    console.log("teachers_restrictions sincronizada");
    await Schedule.sync({ alter: true });
    console.log("schedules sincronizada");
    console.log("Sincronización de tablas schedule completada.");
  } catch (error) {
    console.error("Error durante la sincronización de tablas schedule:", error);
  } finally {
    try {
      await sequelize.close();
    } catch (e) {
      // ignore
    }
  }
}

syncSchedules();

