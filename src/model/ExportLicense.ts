import { Property } from "fabric-contract-api";

export class ExportLicense {

    public request_id: string;
    public request_date: string;
    public exporter: string;
    public carrier: string;
    public description_of_goods: string;
    public approver: string;
    public approver_ref: string;
    public status: string;

    constructor(reqId: string, reqDate: string, exporter: string, carrier: string,
        descriptionofgoods: string, approver="", approver_ref="", status="")   {
        this.request_id = reqId;
        this.request_date = reqDate;
        this.exporter = exporter;
        this.carrier = carrier;
        this.description_of_goods = descriptionofgoods;
        this.approver = approver;
        this.approver_ref = approver_ref;
        this.status = status;
    }



}
