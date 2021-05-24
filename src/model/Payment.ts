import { Object, Property } from 'fabric-contract-api'

//@Object()
export class Payment {
    //@Property()
    public order_ref: string;
    public pay_type: string; // 'cash', 'visa', 'master', 'amex', 'jcb', 'cup', 'nets', 'c-pay'
    public pay_ref: string;
    public pay_amount: number;
    public pay_change: number;   // only applicable for cash payment
    public pay_date: string;

    constructor(order_ref: string, paytype: string, payref: string, payamount: number, paychange: number, paydate: string)   {
        this.order_ref = order_ref;
        this.pay_type = paytype;
        this.pay_ref = payref;
        this.pay_amount = payamount;
        this.pay_change = paychange;
        this.pay_date = paydate;
    }
}

export class AcctPayment extends Payment {

    // public order_ref: string;    // reference of the source order/invoice
    // public pay_type: string;     // "IBT", "cheque", "PayNow"
    // public pay_ref: string;      // Trx reference of the IBT, cheque no, PayNow transfer
    // public pay_amount: number;   // payment amount
    // public pay_change: number;   // only applicable for cash payment
    // public pay_date: string;     // payment date
    public payee: string;
    public pay_vref: string;        // account payable payment voucher reference
    public settlement_bank: string;

    constructor(order_ref: string, paytype: string, payref: string, payamount: number,
        paychange: number, paydate: string, payee: string, pay_vref: string, settlementbank: string)  {
        super(order_ref, paytype, payref, payamount, paychange, paydate);
        this.payee = payee;
        this.pay_vref = pay_vref;
        this.settlement_bank = settlementbank;
    }


}
