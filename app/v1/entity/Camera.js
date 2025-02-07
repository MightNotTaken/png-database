"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
var typeorm_1 = require("typeorm");
var entity_meta_info_1 = require("./entity-meta-info");
var Frame_1 = require("./Frame");
var Machine_1 = require("./Machine");
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera(init) {
        var _this = _super.call(this) || this;
        if (!init) {
            return _this;
        }
        Object.assign(_this, init);
        return _this;
    }
    Camera.keys = function () {
        return [
            {
                key: 'name',
                type: 'string',
                native: true
            },
            {
                key: 'width',
                type: 'number',
                native: true
            },
            {
                key: 'height',
                type: 'number',
                native: true
            },
            {
                key: 'frames',
                type: Frame_1.Frame,
                native: false,
                optional: true,
                population: 'array'
            },
        ];
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Camera.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Camera.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Camera.prototype, "width", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Camera.prototype, "height", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: 0
        }),
        __metadata("design:type", Number)
    ], Camera.prototype, "fps", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: false
        }),
        __metadata("design:type", Boolean)
    ], Camera.prototype, "capture", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Frame_1.Frame; }, function (frame) { return frame.camera; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Camera.prototype, "frames", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Machine_1.Machine; }, function (machine) { return machine.cameras; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", Machine_1.Machine)
    ], Camera.prototype, "machine", void 0);
    Camera = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Object])
    ], Camera);
    return Camera;
}(entity_meta_info_1.EntityMetaInfo));
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map