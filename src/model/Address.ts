import { Object, Property } from 'fabric-contract-api'

export class Address {
    //@Property()
    public addr_id: string;  // address label, e.g. 'home', 'office'
    public addr_line1: string;  // house number + street
    public addr_line2: string;  // unit number, if aplicable
    public addr_line3: string;  // building name, if applicable
    public addr_line4: string;  // company name
    public country: string; // country
    public city: string;    // City, if applicable
    public postal: string;  // postal/zip codes

    constructor(addrid: string, addr1: string, addr2: string, addr3: string, addr4: string,
        country: string, city: string, postal: string)  {
        this.addr_id = addrid;
        this.addr_line1 = addr1;
        this.addr_line2 = addr2;
        this.addr_line3 = addr3;
        this.addr_line4 = addr4;
        this.country = country;
        this.city = city;
        this.postal = postal;
    }

}
