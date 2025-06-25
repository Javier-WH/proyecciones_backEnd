import express from "express";
import ClassroomsRoutes from "./classroomsRoutes/classroomsRoutes.js";

const Router = express.Router();

Router.use(ClassroomsRoutes);

export default Router;

