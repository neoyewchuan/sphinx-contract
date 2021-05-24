import { Context, Contract } from 'fabric-contract-api';
import { Order } from '../model/Order';
export declare class SphinxContract extends Contract {
    orderExists(ctx: Context, orderId: string): Promise<boolean>;
    createOrder(ctx: Context, data: string): Promise<void>;
    retrieveOrder(ctx: Context, orderId: string): Promise<Order>;
    updateOrder(ctx: Context, data: string): Promise<void>;
    deleteOrder(ctx: Context, orderId: string): Promise<void>;
}
