"use strict";
exports.__esModule = true;
exports.Address = void 0;
var Address = /** @class */ (function () {
    function Address(addrid, addr1, addr2, addr3, addr4, country, city, postal) {
        this.addr_id = addrid;
        this.addr_line1 = addr1;
        this.addr_line2 = addr2;
        this.addr_line3 = addr3;
        this.addr_line4 = addr4;
        this.country = country;
        this.city = city;
        this.postal = postal;
    }
    return Address;
}());
exports.Address = Address;
