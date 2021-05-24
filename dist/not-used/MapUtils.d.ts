export var __esModule: boolean;
export var JsonProperty: typeof JsonProperty | undefined;
declare function _default(): void;
declare namespace _default {
    export function isPrimitive(obj: any): boolean;
    export function isArray(object: any): boolean;
    export function getClazz(target: any, propertyKey: any): any;
    export function getJsonProperty(target: any, propertyKey: any): any;
    export function deserialize(clazz: any, jsonObject: any): any;
}
export default _default;
declare function JsonProperty(metadata: any): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
