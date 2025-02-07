import express from "express";
import frameCtrl from "../controllers/frame.controller";

const router = express.Router();
router.post("", frameCtrl.create);
router.put("", frameCtrl.update);
router.get("/list/:cameraID", frameCtrl.list);
router.delete("/:frameID", frameCtrl.remove);
export default router;
