'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fabric_contract_api_1 = require("fabric-contract-api");
var UpdateOrder_1 = require("../model/UpdateOrder");
var Warranty_1 = require("../model/Warranty");
var SphinxContract = /** @class */ (function (_super) {
    __extends(SphinxContract, _super);
    function SphinxContract() {
        return _super.call(this, 'SphinxContract') || this;
    }
    SphinxContract.prototype.orderExists = function (ctx, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.stub.getState(orderId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (!!data && data.length > 0)];
                }
            });
        });
    };
    // @Transaction()
    // public async createOrder(ctx: Context, order: Order): Promise<void> {
    //     //const order: Order = MapUtils.deserialize(Order, data);
    //     const exists: boolean = await this.orderExists(ctx, order.orderId);
    //     if (exists) {
    //         throw new Error(`The order number ${order.orderId} already exists`);
    //     }
    //     const buffer: Buffer = Buffer.from(JSON.stringify(order));
    //     await ctx.stub.putState(order.orderId, buffer);
    // }
    // @Transaction()
    // public async createOrder(ctx: Context, orderId: string,
    //     orderDate: Date, channel: string, store: Store,
    //     furniture: Furniture[], customer: Customer, instruction: string,     // special instruction regarding the order
    //     payment: Payment, status: string): Promise<void> {
    //     //const order: Order = MapUtils.deserialize(Order, data);
    //     const exists: boolean = await this.orderExists(ctx, orderId);
    //     if (exists) {
    //         throw new Error(`The order number ${orderId} already exists`);
    //     }
    //     const order = new Order(orderId, orderDate, channel, store, furniture,
    //         customer, instruction, payment, status);
    //     const buffer: Buffer = Buffer.from(JSON.stringify(order));
    //     await ctx.stub.putState(orderId, buffer);
    // }
    SphinxContract.prototype.createOrder = function (ctx, data) {
        return __awaiter(this, void 0, void 0, function () {
            var order, exists, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = JSON.parse(data.toString());
                        return [4 /*yield*/, this.orderExists(ctx, order.order_id)];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            throw new Error("The order number " + order.order_id + " already exists");
                        }
                        buffer = Buffer.from(JSON.stringify(order));
                        return [4 /*yield*/, ctx.stub.putState(order.order_id, buffer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SphinxContract.prototype.retrieveOrder = function (ctx, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, data, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderExists(ctx, orderId)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("The order number " + orderId + " does not exist");
                        }
                        return [4 /*yield*/, ctx.stub.getState(orderId)];
                    case 2:
                        data = _a.sent();
                        order = JSON.parse(data.toString());
                        return [2 /*return*/, order];
                }
            });
        });
    };
    SphinxContract.prototype.updateOrder = function (ctx, orderId, updFurn, updInstr, updStatus) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, updOrder, _a, buffer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.orderExists(ctx, orderId)];
                    case 1:
                        exists = _b.sent();
                        if (!exists) {
                            throw new Error("The order number " + orderId + " does not exist");
                        }
                        updOrder = new UpdateOrder_1.UpdateOrder(orderId, updFurn, updInstr, updStatus);
                        _a = updOrder.status;
                        switch (_a) {
                            case OrderStatus.ORDER_CREATED: return [3 /*break*/, 2];
                            case OrderStatus.ORDER_VERIFIED: return [3 /*break*/, 3];
                            case OrderStatus.ORDER_CONFIRMED: return [3 /*break*/, 4];
                            case OrderStatus.ORDER_TO_MANUFACTURER: return [3 /*break*/, 5];
                            case OrderStatus.ORDER_COMPLETED: return [3 /*break*/, 7];
                            case OrderStatus.ORDER_CANCELLED: return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 2:
                        if (updStatus === OrderStatus.ORDER_VERIFIED) {
                            updOrder.status = OrderStatus.ORDER_VERIFIED;
                        }
                        return [3 /*break*/, 10];
                    case 3:
                        if (updStatus === OrderStatus.ORDER_CONFIRMED) {
                            updOrder.status = OrderStatus.ORDER_CONFIRMED;
                        }
                        return [3 /*break*/, 10];
                    case 4:
                        if (updStatus === OrderStatus.ORDER_TO_MANUFACTURER) {
                            updOrder.status = OrderStatus.ORDER_TO_MANUFACTURER;
                        }
                        return [3 /*break*/, 10];
                    case 5:
                        buffer = Buffer.from(JSON.stringify(updOrder));
                        return [4 /*yield*/, ctx.stub.putState(orderId, buffer)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 7: throw new Error("The order number " + orderId + " has been completed!");
                    case 8: throw new Error("The order number " + orderId + " was already deleted!");
                    case 9: throw new Error("Updating to order " + orderId + " was denied!");
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    SphinxContract.prototype.deleteOrder = function (ctx, orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.orderExists(ctx, orderId)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("The order number " + orderId + " does not exist");
                        }
                        return [4 /*yield*/, ctx.stub.deleteState(orderId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SphinxContract.prototype.warrantyExists = function (ctx, warId) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.stub.getState(warId)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, (!!data && data.length > 0)];
                }
            });
        });
    };
    SphinxContract.prototype.registerWarranty = function (ctx, warId, prodModel, warPeriod, warStart, custId) {
        return __awaiter(this, void 0, void 0, function () {
            var warStartDate, theMonth, theDay, theYear, addYear, addMonth, testYear, warEnd, warranty, exists, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        warStartDate = new Date(warStart);
                        theMonth = warStartDate.getMonth();
                        theDay = warStartDate.getDay();
                        theYear = warStartDate.getFullYear();
                        addYear = parseInt(warPeriod) / 12;
                        addMonth = parseInt(warPeriod) % 12;
                        if ((theMonth + addMonth) > 12) {
                            addYear++;
                            addMonth -= 12;
                        }
                        if ((theMonth + addMonth) === 2 && theDay >= 29) {
                            testYear = theYear + addYear;
                            if (testYear % 4 === 0 && testYear % 100 !== 0) {
                                // is a leap year, the max day for February is 29
                                theDay = 29;
                            }
                        }
                        warEnd = new String(theYear + addYear).trim()
                            .concat("-", "00" + (theMonth + addMonth).toString().trim().slice(-2), "-", "00" + theDay.toString().trim().slice(-2));
                        warranty = new Warranty_1.Warranty(warId, prodModel, parseInt(warPeriod), warStart, warEnd, custId);
                        return [4 /*yield*/, this.warrantyExists(ctx, warId)];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            throw new Error("The warranty id " + warId + " already exists");
                        }
                        buffer = Buffer.from(JSON.stringify(warranty));
                        return [4 /*yield*/, ctx.stub.putState(warId, buffer).then(function () {
                                console.log("Warranty id " + warranty.war_id + " registered to " + warranty.customer_id + ".");
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SphinxContract.prototype.retrieveWarranty = function (ctx, warrantyId) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, data, warranty;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.warrantyExists(ctx, warrantyId)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("The warranty ID " + warrantyId + " does not exist");
                        }
                        return [4 /*yield*/, ctx.stub.getState(warrantyId)];
                    case 2:
                        data = _a.sent();
                        warranty = JSON.parse(data.toString());
                        return [2 /*return*/, warranty];
                }
            });
        });
    };
    SphinxContract.prototype.issueEL = function () {
        // to-do
    };
    // request an Export License from regulator for cross-border shipments
    SphinxContract.prototype.requestEL = function () { };
    SphinxContract.prototype.issueBoL = function () { };
    SphinxContract.prototype.makePayment = function () { };
    SphinxContract.prototype.issueWarranty = function () { };
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns('boolean')
    ], SphinxContract.prototype, "orderExists");
    __decorate([
        fabric_contract_api_1.Transaction()
    ], SphinxContract.prototype, "createOrder");
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns('Order')
    ], SphinxContract.prototype, "retrieveOrder");
    __decorate([
        fabric_contract_api_1.Transaction()
    ], SphinxContract.prototype, "updateOrder");
    __decorate([
        fabric_contract_api_1.Transaction()
    ], SphinxContract.prototype, "deleteOrder");
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns('boolean')
    ], SphinxContract.prototype, "warrantyExists");
    __decorate([
        fabric_contract_api_1.Transaction()
    ], SphinxContract.prototype, "registerWarranty");
    __decorate([
        fabric_contract_api_1.Transaction(false),
        fabric_contract_api_1.Returns('Warranty')
    ], SphinxContract.prototype, "retrieveWarranty");
    SphinxContract = __decorate([
        fabric_contract_api_1.Info({ title: 'SphinxContract', description: 'Sphinx Smart Contract' })
    ], SphinxContract);
    return SphinxContract;
}(fabric_contract_api_1.Contract));
;
module.exports = SphinxContract;
