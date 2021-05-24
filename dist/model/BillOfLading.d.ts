export declare class BillOfLading {
    id: string;
    expiration_date: string;
    exporter: string;
    carrier: string;
    description_of_goods: string;
    amount: number;
    beneficiary: string;
    source_port: string;
    destination_port: string;
    constructor(id: string, expirationdate: string, exporter: string, carrier: string, descriptionofgoods: string, amount: number, beneficiary: string, sourceport: string, destinationport: string);
}
