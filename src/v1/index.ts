import express from "express";
import routes from "./routes";

const router = express.Router();
router.use("/v1", routes);


export default router;
 