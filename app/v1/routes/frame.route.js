"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var frame_controller_1 = __importDefault(require("../controllers/frame.controller"));
var router = express_1.default.Router();
router.post("", frame_controller_1.default.create);
router.put("", frame_controller_1.default.update);
router.get("/list/:cameraID", frame_controller_1.default.list);
router.delete("/:frameID", frame_controller_1.default.remove);
exports.default = router;
//# sourceMappingURL=frame.route.js.map