import { Object, Property } from "fabric-contract-api";
import { Address } from "./Address";


//@Object()
export class Store {

    //@Property()
    public store_id: string;
    public store_name: string;
    public store_address: Address;

    constructor(storeid: string, storename: string, storeaddr: Address)  {
        this.store_id = storeid;
        this.store_name = storename;
        this.store_address = storeaddr;
    }

}

