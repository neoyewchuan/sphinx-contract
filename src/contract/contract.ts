'use strict';

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { Furniture } from '../model/Furniture';
import { Order } from '../model/Order';
import { UpdateOrder } from '../model/UpdateOrder';
import { Warranty } from '../model/Warranty';
import { ExportLicense } from '../model/ExportLicense';
import { AcctPayment } from '../model/Payment';
import { Shipment } from '../model/Shipment';
import SphinxUtils from '../Util/util';


@Info({ title: 'SphinxContract', description: 'Sphinx Smart Contract' })
class SphinxContract extends Contract {

    constructor()   {
        super('SphinxContract');
    }

    @Transaction(false)
    @Returns('boolean')
    public async orderExists(ctx: Context, orderId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(orderId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createOrder(ctx: Context, data: string): Promise<void> {
        const order: Order = JSON.parse(data.toString()) as
            Order;
        const exists: boolean = await this.orderExists(ctx, order.order_id);
        if (exists) {
            throw new Error(`The order number ${order.order_id} already exists`);
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(order));
        await ctx.stub.putState(order.order_id, buffer);
    }


    @Transaction(false)
    @Returns('Order')
    public async retrieveOrder(ctx: Context, orderId: string): Promise<Order> {
        const exists: boolean = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(orderId);
        const order: Order = JSON.parse(data.toString()) as Order;
        return order;
    }

    @Transaction()
    public async updateOrder(ctx: Context, orderId: string,
        updFurn: Furniture[], updInstr: string, updStatus: string): Promise<void> {
        const exists: boolean = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        const updOrder = new UpdateOrder(orderId, updFurn, updInstr, updStatus);
        // 1-3: still can be updated or cancel ~ 1: order created, 2: order received by factory, 3: order forwarded to factory,
        // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
        // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
        // R: order returned, X: order cancelled
        switch (updOrder.status)   {
            case OrderStatus.ORDER_CREATED:
                if (updStatus === OrderStatus.ORDER_VERIFIED) {
                    updOrder.status = OrderStatus.ORDER_VERIFIED
                }
                break;
            case OrderStatus.ORDER_VERIFIED:
                if (updStatus === OrderStatus.ORDER_CONFIRMED) {
                    updOrder.status = OrderStatus.ORDER_CONFIRMED
                }
                break;
            case OrderStatus.ORDER_CONFIRMED:
                if (updStatus === OrderStatus.ORDER_TO_MANUFACTURER) {
                    updOrder.status = OrderStatus.ORDER_TO_MANUFACTURER
                }
                break;
            case OrderStatus.ORDER_TO_MANUFACTURER:
                // in status '1' - '3', order can still be updated.
                const buffer: Buffer = Buffer.from(JSON.stringify(updOrder));
                await ctx.stub.putState(orderId, buffer);
                break;
            case OrderStatus.ORDER_COMPLETED:
                throw new Error(`The order number ${orderId} has been completed!`);
            case OrderStatus.ORDER_CANCELLED:
                throw new Error(`The order number ${orderId} was already deleted!`);
            default:
                throw new Error(`Updating to order ${orderId} was denied!`);
        }
    }

    @Transaction()
    public async deleteOrder(ctx: Context, orderId: string): Promise<void> {
        const exists: boolean = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        await ctx.stub.deleteState(orderId);
    }

    @Transaction(false)
    @Returns('boolean')
    public async warrantyExists(ctx: Context, warId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(warId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async registerWarranty(ctx: Context, warId: string, prodModel: string, warPeriod: string,
        warStart: string, custId: string): Promise<void> {

        const warEnd = SphinxUtils.calculateWarrantyEndDate(warStart, parseInt(warPeriod));
        const warranty: Warranty = new Warranty(warId, prodModel, parseInt(warPeriod),
                warStart, warEnd, custId);
        const exists: boolean = await this.warrantyExists(ctx, warId);
        if (exists) {
            throw new Error(`The warranty id ${warId} already exists`);
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(warranty));
        await ctx.stub.putState(warId, buffer).then(() =>{
            console.log(`Warranty id ${warranty.war_id} registered to ${warranty.customer_id}.`)
        });

    }

    @Transaction(false)
    @Returns('Warranty')
    public async retrieveWarranty(ctx: Context, warrantyId: string): Promise<Warranty> {
        const exists: boolean = await this.warrantyExists(ctx, warrantyId);
        if (!exists) {
            throw new Error(`The warranty ID ${warrantyId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(warrantyId);
        const warranty: Warranty = JSON.parse(data.toString()) as Warranty;
        return warranty;
    }

    @Transaction()
    public async makePayment(ctx: Context, data: string): Promise<void> {
        const payment: AcctPayment = JSON.parse(data.toString()) as
            AcctPayment;
        const exists: boolean = await this.paymentExists(ctx, payment.pay_vref);
        if (exists) {
            throw new Error(`The payment voucher ${payment.pay_vref} was already submitted` +
                ` on ${payment.pay_date} to ${payment.payee}.`);
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(payment));
        await ctx.stub.putState(payment.pay_vref, buffer);
    }

    @Transaction(false)
    @Returns('boolean')
    async paymentExists(ctx: Context, pay_vref: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(pay_vref);
        return (!!data && data.length > 0);
    }

    @Transaction(false)
    @Returns('AcctPayment')
    public async retrievePayment(ctx: Context, pay_vref: string): Promise<AcctPayment> {
        const exists: boolean = await this.paymentExists(ctx, pay_vref);
        if (!exists) {
            throw new Error(`The payment voucher ${pay_vref} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(pay_vref);
        const payment: AcctPayment = JSON.parse(data.toString()) as AcctPayment;
        return payment;
    }


    // request an Export License from regulator for cross-border shipments
    @Transaction()
    public async requestEL(ctx: Context, data: string): Promise<void> {
        const request: ExportLicense = JSON.parse(data.toString()) as
            ExportLicense;
        const exists: boolean = await this.elExists(ctx, request.request_id);
        if (exists) {
            throw new Error(`The EL request ${request.request_id} already exists`);
        }
        const buffer: Buffer = Buffer.from(JSON.stringify(request));
        await ctx.stub.putState(request.request_id, buffer);
    }

    @Transaction(false)
    @Returns('boolean')
    async elExists(ctx: Context, req_id: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(req_id);
        return (!!data && data.length > 0);
    }

    @Transaction(false)
    @Returns('ExportLicense')
    async retrieveEL(ctx: Context, elReqID: string): Promise<ExportLicense> {
        const exists: boolean = await this.elExists(ctx, elReqID);
        if (!exists) {
            throw new Error(`The export license request ${elReqID} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(elReqID);
        const el: ExportLicense = JSON.parse(data.toString()) as ExportLicense;
        return el;
    }

    @Transaction(false)
    @Returns('number[]')
    async getShipmentLocation(ctx: Context, shipment_id: string): Promise < number[] > {
        const exists: boolean = await this.shipmentExists(ctx, shipment_id);
        if (!exists) {
            throw new Error(`The shipment ${shipment_id} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(shipment_id);
        const shipment: Shipment = JSON.parse(data.toString()) as Shipment;
        return shipment.shipment_loc;
    }


    @Transaction(false)
    @Returns('boolean')
    async shipmentExists(ctx: Context, shipment_id: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(shipment_id);
        return (!!data && data.length > 0);
    }

};
module.exports = SphinxContract
