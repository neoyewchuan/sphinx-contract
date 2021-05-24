"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillOfLading = void 0;
class BillOfLading {
    constructor(id, expirationdate, exporter, carrier, descriptionofgoods, amount, beneficiary, sourceport, destinationport) {
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
exports.BillOfLading = BillOfLading;
//# sourceMappingURL=BillOfLading.js.map