import { Furniture } from './Furniture';
export declare class UpdateOrder {
    order_id: string;
    furniture: Furniture[];
    instruction: string;
    status: string;
    constructor(orderId: string, furniture: Furniture[], instruction: string, status: string);
}
