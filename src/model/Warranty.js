"use strict";
exports.__esModule = true;
exports.Warranty = void 0;
var Warranty = /** @class */ (function () {
    function Warranty(war_id, prod_model, war_period, war_start, war_end, customer_id) {
        this.war_id = war_id;
        this.prod_model = prod_model;
        this.war_period = war_period;
        this.war_start = war_start;
        this.war_end = war_end;
        this.customer_id = customer_id;
    }
    return Warranty;
}());
exports.Warranty = Warranty;
