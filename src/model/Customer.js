"use strict";
exports.__esModule = true;
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(id, fname, lname, billaddr, shipaddr, phone, email) {
        this.id = id;
        this.first_name = fname;
        this.last_name = lname;
        this.bill_addr = billaddr;
        this.ship_addr = shipaddr;
        this.phone = phone;
        this.email = email;
    }
    return Customer;
}());
exports.Customer = Customer;
