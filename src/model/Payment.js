"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AcctPayment = exports.Payment = void 0;
//@Object()
var Payment = /** @class */ (function () {
    function Payment(order_ref, paytype, payref, payamount, paychange, paydate) {
        this.order_ref = order_ref;
        this.pay_type = paytype;
        this.pay_ref = payref;
        this.pay_amount = payamount;
        this.pay_change = paychange;
        this.pay_date = paydate;
    }
    return Payment;
}());
exports.Payment = Payment;
var AcctPayment = /** @class */ (function (_super) {
    __extends(AcctPayment, _super);
    function AcctPayment(order_ref, paytype, payref, payamount, paychange, paydate, payee, pay_vref, settlementbank) {
        var _this = _super.call(this, order_ref, paytype, payref, payamount, paychange, paydate) || this;
        _this.payee = payee;
        _this.pay_vref = pay_vref;
        _this.settlement_bank = settlementbank;
        return _this;
    }
    return AcctPayment;
}(Payment));
exports.AcctPayment = AcctPayment;
