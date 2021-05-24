"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrder = void 0;
//@Object()
class UpdateOrder {
    // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
    // R: order returned, X: order cancelled
    constructor(orderId, furniture, instruction, status) {
        this.order_id = orderId;
        this.furniture = furniture;
        this.instruction = instruction;
        this.status = status;
    }
}
exports.UpdateOrder = UpdateOrder;
//# sourceMappingURL=UpdateOrder.js.map