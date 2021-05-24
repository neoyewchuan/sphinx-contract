export interface IJsonMetaData<T> {
    name?: string;
    clazz?: {
        new (): T;
    };
}
