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
exports.Machine = void 0;
var typeorm_1 = require("typeorm");
var entity_meta_info_1 = require("./entity-meta-info");
var Camera_1 = require("./Camera");
var Machine = /** @class */ (function (_super) {
    __extends(Machine, _super);
    function Machine(init) {
        var _this = _super.call(this) || this;
        if (!init) {
            return _this;
        }
        Object.assign(_this, init);
        return _this;
    }
    Machine.keys = function () {
        return [
            {
                key: 'name',
                type: 'string',
                native: true
            },
            {
                key: 'camera',
                type: Camera_1.Camera,
                native: false,
                optional: true,
                population: 'array'
            }
        ];
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Machine.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Machine.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Camera_1.Camera; }, function (camera) { return camera.machine; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Machine.prototype, "cameras", void 0);
    Machine = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Object])
    ], Machine);
    return Machine;
}(entity_meta_info_1.EntityMetaInfo));
exports.Machine = Machine;
//# sourceMappingURL=Machine.js.map