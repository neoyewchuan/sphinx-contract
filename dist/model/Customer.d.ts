import { Address } from "./Address";
export declare class Customer {
    id: string;
    first_name: string;
    last_name: string;
    bill_addr: Address;
    ship_addr: Address;
    phone: string;
    email: String;
    constructor(id: string, fname: string, lname: string, billaddr: Address, shipaddr: Address, phone: string, email: string);
}
