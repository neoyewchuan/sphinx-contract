export declare class Payment {
    order_ref: string;
    pay_type: string;
    pay_ref: string;
    pay_amount: number;
    pay_change: number;
    pay_date: string;
    constructor(order_ref: string, paytype: string, payref: string, payamount: number, paychange: number, paydate: string);
}
export declare class AcctPayment extends Payment {
    payee: string;
    pay_vref: string;
    settlement_bank: string;
    constructor(order_ref: string, paytype: string, payref: string, payamount: number, paychange: number, paydate: string, payee: string, pay_vref: string, settlementbank: string);
}
