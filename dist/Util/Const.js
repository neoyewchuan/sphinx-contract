"use strict";
var OrderStatus;
(function (OrderStatus) {
    // 1-3: still can be updated or cancel ~ ' ': order created, 1: order verified by Sphinx admin, 2: order confirmed, 3. order processed up by factory
    // 4 onward cannot be changed ~ 4: material indent, 5: furniture building in progress
    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
    // R: order returned, X: order cancelled
    OrderStatus["ORDER_CREATED"] = " ";
    OrderStatus["ORDER_VERIFIED"] = "1";
    OrderStatus["ORDER_CONFIRMED"] = "2";
    OrderStatus["ORDER_TO_MANUFACTURER"] = "3";
    OrderStatus["MATERIAL_INDENT"] = "4";
    OrderStatus["BUILD_IN_PROGRESS"] = "5";
    OrderStatus["READY_TO_SHIP"] = "6";
    OrderStatus["COURIER_PICKED_UP"] = "7";
    OrderStatus["CUSTOM_CLEARANCE"] = "8";
    OrderStatus["CUSTOMER_RECEIPT"] = "9";
    OrderStatus["ORDER_COMPLETED"] = "C";
    OrderStatus["ORDER_RETURNED"] = "R";
    OrderStatus["ORDER_CANCELLED"] = "X";
})(OrderStatus || (OrderStatus = {}));
var Status;
(function (Status) {
    Status["DECLINED"] = "DECLINED";
    Status["REJECTED"] = "REJECTED";
    Status["ACCEPTED"] = "ACCEPTED";
    Status["APPROVED"] = "APPROVED";
    Status["PENDING"] = "PENDING";
})(Status || (Status = {}));
//# sourceMappingURL=Const.js.map