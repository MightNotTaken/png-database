import express from "express";
import cameraCtrl from "../controllers/camera.controller";

const router = express.Router();
router.post("", cameraCtrl.create);
router.put("", cameraCtrl.update);
router.get("/list", cameraCtrl.list);
export default router;
