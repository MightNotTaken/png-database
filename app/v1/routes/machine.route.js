"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var machine_controller_1 = __importDefault(require("../controllers/machine.controller"));
var router = express_1.default.Router();
router.post("", machine_controller_1.default.create);
router.get("/list", machine_controller_1.default.list);
exports.default = router;
//# sourceMappingURL=machine.route.js.map