"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var camera_controller_1 = __importDefault(require("../controllers/camera.controller"));
var router = express_1.default.Router();
router.post("", camera_controller_1.default.create);
router.put("", camera_controller_1.default.update);
router.get("/list", camera_controller_1.default.list);
exports.default = router;
//# sourceMappingURL=camera.route.js.map