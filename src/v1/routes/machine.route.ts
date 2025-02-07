import express from "express";
import machineCtrl from "../controllers/machine.controller";

const router = express.Router();
router.post("", machineCtrl.create);
router.get("/list", machineCtrl.list);
export default router;
