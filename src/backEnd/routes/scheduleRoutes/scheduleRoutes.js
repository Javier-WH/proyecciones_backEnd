import express from "express";
import ClassroomsRoutes from "./classroomsRoutes/classroomsRoutes.js";
import DaysRoutes from "./daysRoutes/daysRoutes.js";
import HoursRoutes from "./hoursRoutes.js";

const Router = express.Router();

Router.use(ClassroomsRoutes);
Router.use(DaysRoutes);
Router.use(HoursRoutes);

export default Router;

