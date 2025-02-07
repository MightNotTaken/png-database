"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!req['multerParams']) {
            return cb(new Error(), '');
        }
        var folder = req.multerParams.folder;
        req.body.folder = folder(file);
        if (!fs_1.default.existsSync(req.body.folder)) {
            fs_1.default.mkdirSync(req.body.folder, {
                recursive: true
            });
        }
        cb(null, req.body.folder);
    },
    filename: function (req, file, cb) {
        var _a;
        req.body.file = (_a = req.multerParams) === null || _a === void 0 ? void 0 : _a.file(file);
        req.body.path = path_1.default.join(req.body.folder, req.body.file);
        cb(null, req.body.file);
    },
});
var fileFilter = function (req, file, cb) {
    if (!file) {
        return cb(null, false);
    }
    if (!req['multerParams']) {
        return cb(null, false);
    }
    var filter = req.multerParams.filter;
    if (filter) {
        var _a = filter(file), allow = _a.allow, error = _a.error;
        if (allow) {
            cb(null, true);
        }
        else {
            cb(error);
        }
    }
    else {
        cb(null, true);
    }
};
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
exports.default = upload;
//# sourceMappingURL=multer.config.js.map