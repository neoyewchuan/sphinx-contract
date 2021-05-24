"use strict";
exports.__esModule = true;
exports.ExportLicense = void 0;
var ExportLicense = /** @class */ (function () {
    function ExportLicense(reqId, reqDate, exporter, carrier, descriptionofgoods, approver, approver_ref, status) {
        if (approver === void 0) { approver = ""; }
        if (approver_ref === void 0) { approver_ref = ""; }
        if (status === void 0) { status = ""; }
        this.request_id = reqId;
        this.request_date = reqDate;
        this.exporter = exporter;
        this.carrier = carrier;
        this.description_of_goods = descriptionofgoods;
        this.approver = approver;
        this.approver_ref = approver_ref;
        this.status = status;
    }
    return ExportLicense;
}());
exports.ExportLicense = ExportLicense;
