import 'reflect-metadata';
import { IJsonMetaData } from '../interface/IJsonMetaData';
export declare function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any;
export default class MapUtils {
    static isPrimitive(obj: any): boolean;
    static isArray(object: any): boolean;
    static getClazz(target: any, propertyKey: string): any;
    static getJsonProperty<T>(target: any, propertyKey: string): IJsonMetaData<T>;
    static deserialize<T>(clazz: {
        new (): T;
    }, jsonObject: any): T | undefined;
}
