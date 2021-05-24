"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
//@Object()
class Order {
    // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
    // R: order returned, X: order cancelled
    constructor(orderId, orderDate, channel, store, furniture, customer, instruction, payment, status) {
        this.order_id = orderId;
        this.order_date = orderDate;
        this.channel = channel;
        this.store = store;
        this.furniture = furniture;
        this.customer = customer;
        this.instruction = instruction;
        this.payment = payment;
        this.status = status;
    }
}
exports.Order = Order;
//# sourceMappingURL=Order.js.map