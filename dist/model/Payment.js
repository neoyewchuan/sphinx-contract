"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcctPayment = exports.Payment = void 0;
//@Object()
class Payment {
    constructor(order_ref, paytype, payref, payamount, paychange, paydate) {
        this.order_ref = order_ref;
        this.pay_type = paytype;
        this.pay_ref = payref;
        this.pay_amount = payamount;
        this.pay_change = paychange;
        this.pay_date = paydate;
    }
}
exports.Payment = Payment;
class AcctPayment extends Payment {
    constructor(order_ref, paytype, payref, payamount, paychange, paydate, payee, pay_vref, settlementbank) {
        super(order_ref, paytype, payref, payamount, paychange, paydate);
        this.payee = payee;
        this.pay_vref = pay_vref;
        this.settlement_bank = settlementbank;
    }
}
exports.AcctPayment = AcctPayment;
//# sourceMappingURL=Payment.js.map