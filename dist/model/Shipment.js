"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipment = void 0;
class Shipment {
    constructor(shipmentid, shipmentdate, exporter, carrier, descriptionofgoods, amount, rcpname, rcpcontact, rcpaddress, rcpinstruct, sourceport, destinationport, shipmenteta, shipmentloc, elref) {
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
exports.Shipment = Shipment;
//# sourceMappingURL=Shipment.js.map