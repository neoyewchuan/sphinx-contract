'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_contract_api_1 = require("fabric-contract-api");
const UpdateOrder_1 = require("../model/UpdateOrder");
const Warranty_1 = require("../model/Warranty");
const util_1 = require("../Util/util");
let SphinxContract = class SphinxContract extends fabric_contract_api_1.Contract {
    constructor() {
        super('SphinxContract');
    }
    async orderExists(ctx, orderId) {
        const data = await ctx.stub.getState(orderId);
        return (!!data && data.length > 0);
    }
    async createOrder(ctx, data) {
        const order = JSON.parse(data.toString());
        const exists = await this.orderExists(ctx, order.order_id);
        if (exists) {
            throw new Error(`The order number ${order.order_id} already exists`);
        }
        const buffer = Buffer.from(JSON.stringify(order));
        await ctx.stub.putState(order.order_id, buffer);
    }
    async retrieveOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        const data = await ctx.stub.getState(orderId);
        const order = JSON.parse(data.toString());
        return order;
    }
    async updateOrder(ctx, orderId, updFurn, updInstr, updStatus) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        const updOrder = new UpdateOrder_1.UpdateOrder(orderId, updFurn, updInstr, updStatus);
        // 1-3: still can be updated or cancel ~ 1: order created, 2: order received by factory, 3: order forwarded to factory,
        // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
        // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
        // R: order returned, X: order cancelled
        switch (updOrder.status) {
            case OrderStatus.ORDER_CREATED:
                if (updStatus === OrderStatus.ORDER_VERIFIED) {
                    updOrder.status = OrderStatus.ORDER_VERIFIED;
                }
                break;
            case OrderStatus.ORDER_VERIFIED:
                if (updStatus === OrderStatus.ORDER_CONFIRMED) {
                    updOrder.status = OrderStatus.ORDER_CONFIRMED;
                }
                break;
            case OrderStatus.ORDER_CONFIRMED:
                if (updStatus === OrderStatus.ORDER_TO_MANUFACTURER) {
                    updOrder.status = OrderStatus.ORDER_TO_MANUFACTURER;
                }
                break;
            case OrderStatus.ORDER_TO_MANUFACTURER:
                // in status '1' - '3', order can still be updated.
                const buffer = Buffer.from(JSON.stringify(updOrder));
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
    async deleteOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        await ctx.stub.deleteState(orderId);
    }
    async warrantyExists(ctx, warId) {
        const data = await ctx.stub.getState(warId);
        return (!!data && data.length > 0);
    }
    async registerWarranty(ctx, warId, prodModel, warPeriod, warStart, custId) {
        const warEnd = util_1.default.calculateWarrantyEndDate(warStart, parseInt(warPeriod));
        const warranty = new Warranty_1.Warranty(warId, prodModel, parseInt(warPeriod), warStart, warEnd, custId);
        const exists = await this.warrantyExists(ctx, warId);
        if (exists) {
            throw new Error(`The warranty id ${warId} already exists`);
        }
        const buffer = Buffer.from(JSON.stringify(warranty));
        await ctx.stub.putState(warId, buffer).then(() => {
            console.log(`Warranty id ${warranty.war_id} registered to ${warranty.customer_id}.`);
        });
    }
    async retrieveWarranty(ctx, warrantyId) {
        const exists = await this.warrantyExists(ctx, warrantyId);
        if (!exists) {
            throw new Error(`The warranty ID ${warrantyId} does not exist`);
        }
        const data = await ctx.stub.getState(warrantyId);
        const warranty = JSON.parse(data.toString());
        return warranty;
    }
    async makePayment(ctx, data) {
        const payment = JSON.parse(data.toString());
        const exists = await this.paymentExists(ctx, payment.pay_vref);
        if (exists) {
            throw new Error(`The payment voucher ${payment.pay_vref} was already submitted` +
                ` on ${payment.pay_date} to ${payment.payee}.`);
        }
        const buffer = Buffer.from(JSON.stringify(payment));
        await ctx.stub.putState(payment.pay_vref, buffer);
    }
    async paymentExists(ctx, pay_vref) {
        const data = await ctx.stub.getState(pay_vref);
        return (!!data && data.length > 0);
    }
    async retrievePayment(ctx, pay_vref) {
        const exists = await this.paymentExists(ctx, pay_vref);
        if (!exists) {
            throw new Error(`The payment voucher ${pay_vref} does not exist`);
        }
        const data = await ctx.stub.getState(pay_vref);
        const payment = JSON.parse(data.toString());
        return payment;
    }
    // request an Export License from regulator for cross-border shipments
    async requestEL(ctx, data) {
        const request = JSON.parse(data.toString());
        const exists = await this.elExists(ctx, request.request_id);
        if (exists) {
            throw new Error(`The EL request ${request.request_id} already exists`);
        }
        const buffer = Buffer.from(JSON.stringify(request));
        await ctx.stub.putState(request.request_id, buffer);
    }
    async elExists(ctx, req_id) {
        const data = await ctx.stub.getState(req_id);
        return (!!data && data.length > 0);
    }
    async retrieveEL(ctx, elReqID) {
        const exists = await this.elExists(ctx, elReqID);
        if (!exists) {
            throw new Error(`The export license request ${elReqID} does not exist`);
        }
        const data = await ctx.stub.getState(elReqID);
        const el = JSON.parse(data.toString());
        return el;
    }
    async getShipmentLocation(ctx, shipment_id) {
        const exists = await this.shipmentExists(ctx, shipment_id);
        if (!exists) {
            throw new Error(`The shipment ${shipment_id} does not exist`);
        }
        const data = await ctx.stub.getState(shipment_id);
        const shipment = JSON.parse(data.toString());
        return shipment.shipment_loc;
    }
    async shipmentExists(ctx, shipment_id) {
        const data = await ctx.stub.getState(shipment_id);
        return (!!data && data.length > 0);
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "orderExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "createOrder", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "retrieveOrder", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, Array, String, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "updateOrder", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "deleteOrder", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "warrantyExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "registerWarranty", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('Warranty'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "retrieveWarranty", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "makePayment", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "paymentExists", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('AcctPayment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "retrievePayment", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "requestEL", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "elExists", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('ExportLicense'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "retrieveEL", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('number[]'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "getShipmentLocation", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "shipmentExists", null);
SphinxContract = __decorate([
    fabric_contract_api_1.Info({ title: 'SphinxContract', description: 'Sphinx Smart Contract' }),
    __metadata("design:paramtypes", [])
], SphinxContract);
;
module.exports = SphinxContract;
//# sourceMappingURL=contract.js.map