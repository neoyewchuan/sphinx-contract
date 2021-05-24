"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportLicense = void 0;
class ExportLicense {
    constructor(reqId, reqDate, exporter, carrier, descriptionofgoods, approver = "", approver_ref = "", status = "") {
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
exports.ExportLicense = ExportLicense;
//# sourceMappingURL=ExportLicense.js.map