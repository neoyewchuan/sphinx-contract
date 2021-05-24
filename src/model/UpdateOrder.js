"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UpdateOrder = void 0;
//@Object()
var UpdateOrder = /** @class */ (function () {
    // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
    // R: order returned, X: order cancelled
    function UpdateOrder(orderId, furniture, instruction, status) {
        this.order_id = orderId;
        this.furniture = furniture;
        this.instruction = instruction;
        this.status = status;
    }
    return UpdateOrder;
}());
exports.UpdateOrder = UpdateOrder;
