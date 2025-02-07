"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var camera_route_1 = __importDefault(require("./camera.route"));
var machine_route_1 = __importDefault(require("./machine.route"));
var frame_route_1 = __importDefault(require("./frame.route"));
var routes = express_1.default.Router();
routes.use("/camera", camera_route_1.default);
routes.use("/machine", machine_route_1.default);
routes.use("/frame", frame_route_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map