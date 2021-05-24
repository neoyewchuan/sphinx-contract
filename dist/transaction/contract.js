"use strict";
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
exports.SphinxContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const Order_1 = require("../model/Order");
const MapUtils_1 = require("../Util/MapUtils");
let SphinxContract = class SphinxContract extends fabric_contract_api_1.Contract {
    async orderExists(ctx, orderId) {
        const data = await ctx.stub.getState(orderId);
        return (!!data && data.length > 0);
    }
    async createOrder(ctx, data) {
        const order = MapUtils_1.default.deserialize(Order_1.Order, data);
        const exists = await this.orderExists(ctx, order.orderId);
        if (exists) {
            throw new Error(`The order number ${order.orderId} already exists`);
        }
        const buffer = Buffer.from(JSON.stringify(order));
        await ctx.stub.putState(order.orderId, buffer);
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
    async updateOrder(ctx, data) {
        const order = MapUtils_1.default.deserialize(Order_1.Order, data);
        const exists = await this.orderExists(ctx, order.orderId);
        if (!exists) {
            throw new Error(`The order number ${order.orderId} does not exist`);
        }
        // if (order.status in ('1','2','3'))  {
        // }
        // 1-3: still can be updated or cancel ~ 1: order created, 2: order received by factory, 3: order forwarded to factory, 
        // 4 onward cannot be changed ~ 4: material ordered, 5: furniture building in progress
        // 6: ready to ship , 7: at hand of shipper, 8: clear custom, 9: order received by customer, C: order completed
        // R: order returned, X: order cancelled
        switch (order.status) {
            case OrderStatus.ORDER_CREATED:
            case OrderStatus.ORDER_VERIFIED:
            case OrderStatus.ORDER_CONFIRMED:
            case OrderStatus.ORDER_TO_FACTORY:
                // in status '1' - '3', order can still be updated.
                const buffer = Buffer.from(JSON.stringify(order));
                await ctx.stub.putState(order.orderId, buffer);
                break;
            case OrderStatus.ORDER_COMPLETED:
                throw new Error(`The order number ${order.orderId} has been completed!`);
            case OrderStatus.ORDER_CANCELLED:
                throw new Error(`The order number ${order.orderId} was already deleted!`);
            default:
                throw new Error(`Updating to order ${order.orderId} was denied!`);
        }
        // const buffer: Buffer = Buffer.from(JSON.stringify(order));
        // await ctx.stub.putState(order.orderId, buffer);
    }
    async deleteOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order number ${orderId} does not exist`);
        }
        await ctx.stub.deleteState(orderId);
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
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "updateOrder", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxContract.prototype, "deleteOrder", null);
SphinxContract = __decorate([
    fabric_contract_api_1.Info({ title: 'SphinxContract', description: 'Sphinx Smart Contract' })
], SphinxContract);
exports.SphinxContract = SphinxContract;
//# sourceMappingURL=contract.js.map