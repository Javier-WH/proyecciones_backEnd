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

async function recreate() {
  try {
    console.log("Iniciando recreación de tablas de schedule...");
    // El orden puede importar por constraints; dropeamos/recreamos en orden seguro
    await Classrooms.sync({ force: true });
    console.log("classrooms recreada");
    await Days.sync({ force: true });
    console.log("days recreada");
    await Hours.sync({ force: true });
    console.log("hours recreada");
    await SubjectRestrictions.sync({ force: true });
    console.log("subjects_restrictions recreada");
    await TeachersRestrictions.sync({ force: true });
    console.log("teachers_restrictions recreada");
    await Schedule.sync({ force: true });
    console.log("schedules recreada");
    console.log("Recreación completada con éxito.");
  } catch (error) {
    console.error("Error recreando tablas de schedule:", error);
  } finally {
    await sequelize.close();
  }
}

recreate();

