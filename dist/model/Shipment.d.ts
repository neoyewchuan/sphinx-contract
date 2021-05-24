import { Address } from "./Address";
export declare class Shipment {
    shipment_id: string;
    shipment_date: string;
    exporter: string;
    carrier: string;
    description_of_goods: string;
    amount: number;
    rcp_name: string;
    rcp_contact: string;
    rcp_address: Address;
    rcp_instruct: string;
    source_port: string;
    destination_port: string;
    shipment_eta: string;
    shipment_loc: number[];
    el_reference: string;
    constructor(shipmentid: string, shipmentdate: string, exporter: string, carrier: string, descriptionofgoods: string, amount: number, rcpname: string, rcpcontact: string, rcpaddress: Address, rcpinstruct: string, sourceport: string, destinationport: string, shipmenteta: string, shipmentloc: number[], elref: string);
}
