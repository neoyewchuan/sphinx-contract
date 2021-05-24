import { Property } from "fabric-contract-api"

export class BillOfLading {

   // @Property()
    public id: string;
    public expiration_date: string;
    public exporter: string;
    public carrier: string;
    public description_of_goods: string;
    public amount: number;
    public beneficiary: string;
    public source_port: string;
    public destination_port: string;

    constructor(id: string, expirationdate: string, exporter: string, carrier: string,
        descriptionofgoods: string, amount: number, beneficiary: string, sourceport: string, destinationport: string)   {
        this.id = id;
        this.expiration_date = expirationdate;
        this.exporter = exporter;
        this.carrier = carrier;
        this.description_of_goods = descriptionofgoods;
        this.amount = amount;
        this.beneficiary = beneficiary;
        this.source_port = sourceport;
        this.destination_port = destinationport;
    }

}
