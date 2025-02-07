import { KeyInterface } from "../interfaces/key.interface";

export class EntityMetaInfo {
    public static keys(): KeyInterface[] {
        return [];
    }
    
    public static type() {
        let response  = {};
        for (let {type, native, key} of this.keys()) {
            if (native) {
                response[key] = type;
            } else {
                response[key] = type.type()
            }
        }
        return response;
    }
    
    public static isMissing(body: any) {
        let response = {};
        if (!body) {
            return this.type();
        };
        for (let {type, key, native, optional} of this.keys()) {
            if (optional) {
                continue;
            }
            if (native) {
                if (body[key] == undefined) {
                    response[key] = type;
                }
            } else {
                let missing = type.isMissing(body[key]);
                if (missing) {
                    response[key] = missing;
                }
            }
        }
        if (Object.keys(response).length) {
            return response
        }
        return null;
    }
};