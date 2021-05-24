import { Address } from "./Address";
export declare class Store {
    store_id: string;
    store_name: string;
    store_address: Address;
    constructor(storeid: string, storename: string, storeaddr: Address);
}
