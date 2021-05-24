import { Property } from "fabric-contract-api"
import { Address } from "./Address";

export class Shipment {

    // @Property()
    public shipment_id: string;
    public shipment_date: string;
    public exporter: string;
    public carrier: string;
    public description_of_goods: string;
    public amount: number;
    public rcp_name: string;    // recipient name
    public rcp_contact: string; // recipient contact
    public rcp_address: Address;
    public rcp_instruct: string;
    public source_port: string;
    public destination_port: string;
    public shipment_eta: string;
    public shipment_loc: number[];  // storing the longitude & latitude of the shipment geolocation
    public el_reference: string;    // export license reference, if any

    constructor(shipmentid: string, shipmentdate: string, exporter: string, carrier: string,
        descriptionofgoods: string, amount: number, rcpname: string, rcpcontact: string, rcpaddress: Address,
        rcpinstruct: string, sourceport: string, destinationport: string,
        shipmenteta: string, shipmentloc: number[], elref: string) {
        this.shipment_id = shipmentid;
        this.shipment_date = shipmentdate;
        this.exporter = exporter;
        this.carrier = carrier;
        this.description_of_goods = descriptionofgoods;
        this.amount = amount;
        this.rcp_name = rcpname;
        this.rcp_contact = rcpcontact;
        this.rcp_address = rcpaddress;
        this.rcp_instruct = rcpinstruct;
        this.source_port = sourceport;
        this.destination_port = destinationport;
        this.shipment_eta = shipmenteta;
        this.shipment_loc = shipmentloc;
        this.el_reference = elref;
    }

}
