"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pillbox_controller_1 = __importDefault(require("../controllers/pillbox.controller"));
var router = express_1.default.Router();
router.post('/', pillbox_controller_1.default.create);
router.get('/provision/:mac', pillbox_controller_1.default.startProvision);
exports.default = router;
//# sourceMappingURL=pillbox.route.js.map