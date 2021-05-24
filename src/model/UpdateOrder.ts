/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';
import { Customer } from './Customer';
import { Furniture } from './Furniture';
import { Payment } from './Payment';
import { Store } from './Store';

//@Object()
export class UpdateOrder {

    //@Property()
    public order_id: string;         // order reference
    public furniture: Furniture[];  // furniture ordered
    public instruction: string;     // special instruction regarding the order
    public status: string;          // 1-3: still can be updated or cancel ~ 1: order created, 2: order received by factory, 3: order forwarded to factory,
    // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
    // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
    // R: order returned, X: order cancelled

    constructor(orderId: string, furniture: Furniture[],
        instruction: string, status: string) {
        this.order_id = orderId;
        this.furniture = furniture;
        this.instruction = instruction;
        this.status = status;

    }
}








