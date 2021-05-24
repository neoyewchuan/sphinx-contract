import { Object, Property } from "fabric-contract-api";
import { Address } from "./Address";

export class Customer {

    //@Property()
    public id: string;          // customer ID
    public first_name: string;    // first name of customer
    public last_name: string;    // last name of customer
    public bill_addr: Address;   // billing address
    public ship_addr: Address;   // shipping address
    public phone: string;       // main contact number for status updates/notification
    public email: String;       // email address for status update/notification

    constructor(id: string, fname: string, lname: string,
        billaddr: Address, shipaddr: Address, phone: string, email: string)   {
        this.id = id;
        this.first_name = fname;
        this.last_name = lname;
        this.bill_addr = billaddr;
        this.ship_addr = shipaddr;
        this.phone = phone;
        this.email = email;
    }
}
