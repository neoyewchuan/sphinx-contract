import { Customer } from './Customer';
import { Furniture } from './Furniture';
import { Payment } from './Payment';
import { Store } from './Store';
export declare class Order {
    order_id: string;
    order_date: string;
    channel: string;
    store: Store;
    furniture: Furniture[];
    customer: Customer;
    instruction: string;
    payment: Payment;
    status: string;
    constructor(orderId: string, orderDate: string, channel: string, store: Store, furniture: Furniture[], customer: Customer, instruction: string, payment: Payment, status: string);
}
