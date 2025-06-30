import express from "express";
import ClassroomsRoutes from "./classroomsRoutes/classroomsRoutes.js";
import DaysRoutes from "./daysRoutes/daysRoutes.js";

const Router = express.Router();

Router.use(ClassroomsRoutes);
Router.use(DaysRoutes);

export default Router;

