import express from "express";
import cameraRoutes from './camera.route';
import machineRoutes from './machine.route';
import frameRoutes from './frame.route';

const routes = express.Router();
routes.use("/camera", cameraRoutes);
routes.use("/machine", machineRoutes);
routes.use("/frame", frameRoutes);

export default routes;
