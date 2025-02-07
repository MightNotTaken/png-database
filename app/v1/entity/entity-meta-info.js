"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityMetaInfo = void 0;
var EntityMetaInfo = /** @class */ (function () {
    function EntityMetaInfo() {
    }
    EntityMetaInfo.keys = function () {
        return [];
    };
    EntityMetaInfo.type = function () {
        var response = {};
        for (var _i = 0, _a = this.keys(); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b.type, native = _b.native, key = _b.key;
            if (native) {
                response[key] = type;
            }
            else {
                response[key] = type.type();
            }
        }
        return response;
    };
    EntityMetaInfo.isMissing = function (body) {
        var response = {};
        if (!body) {
            return this.type();
        }
        ;
        for (var _i = 0, _a = this.keys(); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b.type, key = _b.key, native = _b.native, optional = _b.optional;
            if (optional) {
                continue;
            }
            if (native) {
                if (body[key] == undefined) {
                    response[key] = type;
                }
            }
            else {
                var missing = type.isMissing(body[key]);
                if (missing) {
                    response[key] = missing;
                }
            }
        }
        if (Object.keys(response).length) {
            return response;
        }
        return null;
    };
    return EntityMetaInfo;
}());
exports.EntityMetaInfo = EntityMetaInfo;
;
//# sourceMappingURL=entity-meta-info.js.map