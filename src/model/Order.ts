/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { Customer } from './Customer';
import { Furniture } from './Furniture';
import { Payment } from './Payment';
import { Store } from './Store';

//@Object()
export class Order {

    //@Property()
    public order_id: string;         // order reference
    public order_date: string;         // order date
    public channel: string;         // 'walk-in', 'on-line'
    public store: Store;            // store where the order was raised, applicable to walk-in
    public furniture: Furniture[];  // furniture ordered
    public customer: Customer;      // customer info
    public instruction: string;     // special instruction regarding the order
    public payment: Payment;        // payment to this order
    public status: string;          // 1-3: still can be updated or cancel ~ 1: order created, 2: order received by factory, 3: order forwarded to factory,
                                    // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
                                    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
                                    // R: order returned, X: order cancelled

    constructor(orderId: string, orderDate: string, channel: string, store: Store, furniture: Furniture[],
        customer: Customer, instruction: string, payment: Payment, status: string)  {
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








