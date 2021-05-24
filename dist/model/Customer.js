"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor(id, fname, lname, billaddr, shipaddr, phone, email) {
        this.id = id;
        this.first_name = fname;
        this.last_name = lname;
        this.bill_addr = billaddr;
        this.ship_addr = shipaddr;
        this.phone = phone;
        this.email = email;
    }
}
exports.Customer = Customer;
//# sourceMappingURL=Customer.js.map