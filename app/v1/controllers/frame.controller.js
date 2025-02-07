"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_message_controller_1 = require("./response-message.controller");
var db_1 = require("../../db");
var Frame_1 = require("../entity/Frame");
var Camera_1 = require("../entity/Camera");
var FrameRepo = db_1.AppDataSource.getRepository(Frame_1.Frame);
var CameraRepo = db_1.AppDataSource.getRepository(Camera_1.Camera);
var FrameController = /** @class */ (function () {
    function FrameController() {
    }
    FrameController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var missingParameters, camera, targetFrame, i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        console.log(req.body);
                        missingParameters = Frame_1.Frame.isMissing(req.body);
                        if (missingParameters) {
                            return [2 /*return*/, res.status(400).json({
                                    message: response_message_controller_1.ResponseMessage.MISSING_PARAMETERS,
                                    expected: {
                                        body: missingParameters,
                                        qyery: {}
                                    }
                                })];
                        }
                        return [4 /*yield*/, CameraRepo.findOne({
                                where: {
                                    id: +req.body.camera.id
                                },
                                relations: ['frames']
                            })];
                    case 1:
                        camera = _a.sent();
                        targetFrame = void 0;
                        for (i = 0; i < camera.frames.length; i++) {
                            if (camera.frames[i].sachet == +req.body.sachet) {
                                targetFrame = camera.frames[i];
                                break;
                            }
                        }
                        if (!targetFrame) return [3 /*break*/, 2];
                        Object.assign(targetFrame, req.body);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, FrameRepo.create(req.body)];
                    case 3:
                        targetFrame = _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, FrameRepo.save(targetFrame)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json(targetFrame)];
                    case 6:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.status(500).json({
                            message: response_message_controller_1.ResponseMessage.INTERNAL_SERVER_ERROR
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FrameController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.body);
                        return [4 /*yield*/, FrameRepo.update({
                                id: +req.body.id
                            }, req.body)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({
                                message: response_message_controller_1.ResponseMessage.SUCCESS
                            })];
                    case 2:
                        error_2 = _a.sent();
                        console.error(error_2);
                        res.status(500).json({
                            message: response_message_controller_1.ResponseMessage.INTERNAL_SERVER_ERROR
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FrameController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cameraID, camera, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        cameraID = req.params.cameraID;
                        return [4 /*yield*/, CameraRepo.findOne({
                                where: {
                                    id: +cameraID
                                },
                                relations: ['frames']
                            })];
                    case 1:
                        camera = _a.sent();
                        res.status(200).json(camera.frames);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        res.status(500).json({
                            message: response_message_controller_1.ResponseMessage.INTERNAL_SERVER_ERROR
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FrameController.prototype.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var frameID, frame, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        frameID = req.params.frameID;
                        return [4 /*yield*/, FrameRepo.findOne({
                                where: {
                                    id: +frameID
                                }
                            })];
                    case 1:
                        frame = _a.sent();
                        console.log(frame);
                        if (!frame) return [3 /*break*/, 3];
                        return [4 /*yield*/, FrameRepo.remove(frame)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        res.status(200).json({
                            message: response_message_controller_1.ResponseMessage.SUCCESS
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        console.error(error_4);
                        res.status(500).json({
                            message: response_message_controller_1.ResponseMessage.INTERNAL_SERVER_ERROR
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FrameController;
}());
;
var frameCtrl = new FrameController();
exports.default = frameCtrl;
//# sourceMappingURL=frame.controller.js.map