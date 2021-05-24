"use strict";
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
var fabric_network_1 = require("fabric-network");
var path = require("path");
var fs = require("fs");
require("source-map-support/register");
var Order_1 = require("../model/Order");
var Store_1 = require("../model/Store");
var Address_1 = require("../model/Address");
var Furniture_1 = require("../model/Furniture");
var Customer_1 = require("../model/Customer");
var Payment_1 = require("../model/Payment");
var Drawing_1 = require("../model/Drawing");
var util_1 = require("../Util/util");
var ExportLicense_1 = require("../model/ExportLicense");
var readLineSync = require('readline-sync');
var selOption;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var walletPath, wallet, gateway, connectionProfilePath, connectionProfile, connectionOptions, network, contract, userInput, _a, order_id, warranty_id, payment_vouch, el_request_id, warrantyStart, warrantyPeriod, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 29, , 30]);
                    // Check for parameter for a ran option, if none was provided, default to '2' - testRetriveOrder
                    selOption = (process.argv[2] !== undefined) ? process.argv[2] : '2'; // TODO change
                    walletPath = path.join(process.cwd(), 'Sphinx_Wallet');
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1:
                    wallet = _b.sent();
                    gateway = new fabric_network_1.Gateway();
                    connectionProfilePath = path.resolve(__dirname, '../../', 'SphinxChannelConnection.json');
                    connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8'));
                    connectionOptions = {
                        wallet: wallet,
                        identity: 'sphinxadmin', discovery: { enabled: true, asLocalhost: false }
                    };
                    network = void 0;
                    contract = void 0;
                    userInput = void 0;
                    _a = selOption;
                    switch (_a) {
                        case '1': return [3 /*break*/, 2];
                        case '2': return [3 /*break*/, 5];
                        case '3': return [3 /*break*/, 8];
                        case '4': return [3 /*break*/, 11];
                        case '5': return [3 /*break*/, 14];
                        case '6': return [3 /*break*/, 17];
                        case '7': return [3 /*break*/, 20];
                        case '8': return [3 /*break*/, 23];
                        case '9': return [3 /*break*/, 26];
                    }
                    return [3 /*break*/, 27];
                case 2:
                    console.clear();
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 4:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testCreateOrder(contract, gateway);
                    return [3 /*break*/, 28];
                case 5:
                    console.clear();
                    order_id = '12104-278971';
                    userInput = readLineSync.question("\nEnter an order id (default is " + order_id + ") :");
                    if (userInput !== '') {
                        order_id = userInput;
                    }
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 7:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRetrieveOrder(contract, gateway, order_id);
                    return [3 /*break*/, 28];
                case 8:
                    console.clear();
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 10:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRegisterWarranty(contract, gateway);
                    return [3 /*break*/, 28];
                case 11:
                    console.clear();
                    warranty_id = 'WA121-6031';
                    userInput = readLineSync.question("\nEnter an order id (default is " + warranty_id + ") :");
                    if (userInput !== '') {
                        warranty_id = userInput;
                    }
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 13:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRetrieveWarranty(contract, gateway, warranty_id);
                    return [3 /*break*/, 28];
                case 14:
                    console.clear();
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 15:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 16:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testMakePayment(contract, gateway);
                    return [3 /*break*/, 28];
                case 17:
                    console.clear();
                    payment_vouch = 'PV00000000864792';
                    userInput = readLineSync.question("\nEnter a payment voucher # (default is " + payment_vouch + ") :");
                    if (userInput !== "") {
                        payment_vouch = userInput;
                    }
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 19:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRetrievePayment(contract, gateway, payment_vouch);
                    return [3 /*break*/, 28];
                case 20:
                    console.clear();
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 21:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 22:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRequestEL(contract, gateway);
                    return [3 /*break*/, 28];
                case 23:
                    console.clear();
                    el_request_id = 'REL121-3894';
                    userInput = readLineSync.question("\nEnter a export license request id (default is " + el_request_id + ") :");
                    if (userInput !== "") {
                        el_request_id = userInput;
                    }
                    return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 24:
                    _b.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 25:
                    network = _b.sent();
                    contract = network.getContract('sphinx-contract');
                    testRetrieveEL(contract, gateway, el_request_id);
                    return [3 /*break*/, 28];
                case 26:
                    console.clear();
                    warrantyStart = util_1["default"].formatDateYMD(new Date());
                    userInput = readLineSync.question("\nEnter a Warranty start Date in yyyy-mm-dd (default is " + warrantyStart + ") :");
                    if (userInput !== "") {
                        warrantyStart = userInput;
                    }
                    warrantyPeriod = '12';
                    userInput = readLineSync.question("\nEnter the Warranty period (no. of months, default is " + warrantyPeriod + ") :");
                    if (userInput !== "") {
                        warrantyPeriod = userInput;
                    }
                    calculateWarrantyEndDate(warrantyStart, warrantyPeriod);
                    return [3 /*break*/, 28];
                case 27:
                    console.clear();
                    console.log("No valid run option is specified, please run 'node app.ts {1|2|3|4|5}'..");
                    _b.label = 28;
                case 28: return [3 /*break*/, 30];
                case 29:
                    error_1 = _b.sent();
                    console.error('Failed to call transaction:', error_1);
                    process.exit(0);
                    return [3 /*break*/, 30];
                case 30: return [2 /*return*/];
            }
        });
    });
}
void main();
function testCreateOrder(cont, gw) {
    return __awaiter(this, void 0, void 0, function () {
        var finished, orderNumber, materialIdx, txnDate, custAddr, order, transaction, orderstring;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Creating Order...");
                    finished = false;
                    orderNumber = randDocNumber("OR");
                    materialIdx = Math.floor(Math.random() * 18);
                    txnDate = util_1["default"].formatDateYMD(new Date());
                    custAddr = new Address_1.Address('home', randStreetName(), randUnitNumber(), '', '', 'Singapore', 'SG', randDocNumber(""));
                    order = new Order_1.Order(orderNumber, txnDate, "retail", new Store_1.Store('SG001', 'Sphinx Experience Store', new Address_1.Address('001', '1 Heaven Road', '#01-07/08/09', '', '', 'Singapore', 'SG', '123456')), [new Furniture_1.Furniture('001', '001', '001', '002', ("000" + materialIdx).slice(-3), randMaterialOrigin(materialIdx), 120, 60, 108, 0, 0, 0, new Drawing_1.Drawing())], new Customer_1.Customer(randCustomer(), randFirstName(), randLastName(), custAddr, custAddr, randPhoneNumber(), ''), randInstruction(), new Payment_1.Payment(orderNumber, randPayType(), randDocNumber("PR"), Math.floor(Math.random() * 9999) + 1000, 0, txnDate), '');
                    transaction = cont.createTransaction('createOrder');
                    orderstring = Buffer.from(JSON.stringify(order));
                    return [4 /*yield*/, transaction.submit(orderstring.toString())];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    console.log("Order " + order.order_id + " for customer " + order.customer.first_name + " has been submitted");
                    finished = true; // usually set to true by the handler above
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRetrieveOrder(cont, gw, order_id) {
    if (order_id === void 0) { order_id = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var orderid, finished, transaction, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieving Order...");
                    orderid = '12104-000001';
                    if (order_id !== '') {
                        orderid = order_id;
                    }
                    finished = false;
                    transaction = cont.createTransaction('retrieveOrder');
                    return [4 /*yield*/, transaction.evaluate(orderid)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    finished = true; // usually set to true by the handler above
                    console.log('Transaction has been evaluated, result is: ');
                    console.log(JSON.parse(result.toString()));
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRegisterWarranty(cont, gw) {
    return __awaiter(this, void 0, void 0, function () {
        var finished, transaction, warrantyId, productModel, warrantyPeriod, warrantyStart, customerId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Registering Warranty...");
                    finished = false;
                    transaction = cont.createTransaction('registerWarranty');
                    warrantyId = randDocNumber("WA");
                    productModel = randProdModel();
                    warrantyPeriod = randWarrantyPeriod();
                    warrantyStart = util_1["default"].formatDateYMD(new Date());
                    customerId = randCustomer();
                    return [4 /*yield*/, transaction.submit(warrantyId, productModel, warrantyPeriod.toString(), warrantyStart, customerId)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    console.log("Warranty " + warrantyId + " has been submitted");
                    finished = true; // usually set to true by the handler above
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRetrieveWarranty(cont, gw, warranty_id) {
    if (warranty_id === void 0) { warranty_id = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var warrantyId, finished, transaction, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieving Warranty...");
                    warrantyId = 'WA121-1357';
                    if (warranty_id !== '') {
                        warrantyId = warranty_id;
                    }
                    finished = false;
                    transaction = cont.createTransaction('retrieveWarranty');
                    return [4 /*yield*/, transaction.evaluate(warrantyId)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    finished = true; // usually set to true by the handler above
                    console.log('Transaction has been evaluated, result is: ');
                    console.log(JSON.parse(result.toString()));
                    //console.log(`Transaction has been evaluated, result is: ${JSONstringify(result.toString())}`);
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function calculateWarrantyEndDate(warStart, warPeriod) {
    var theWarPeriod = parseInt(warPeriod);
    console.log("");
    console.log("The expiration date for warranty (of date " + warStart + ") with " + warPeriod + "-mths period is " + util_1["default"].calculateWarrantyEndDate(warStart, theWarPeriod));
}
function testMakePayment(cont, gw) {
    return __awaiter(this, void 0, void 0, function () {
        var finished, payment, transaction, paymentstring;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Make Payment...");
                    finished = false;
                    payment = new Payment_1.AcctPayment(randDocNumber("IN"), 'PayNow', randDocNumber("PN"), Math.floor(Math.random() * 50000) + 2000, 0, util_1["default"].formatDateYMD(new Date()), randManufacturer(), randDocNumber("PV"), randSettlementBank());
                    transaction = cont.createTransaction('makePayment');
                    paymentstring = Buffer.from(JSON.stringify(payment));
                    return [4 /*yield*/, transaction.submit(paymentstring.toString())];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    console.log("Payment " + payment.pay_vref + " has been submitted");
                    finished = true; // usually set to true by the handler above
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRetrievePayment(cont, gw, payment_vouch) {
    if (payment_vouch === void 0) { payment_vouch = 'PAY000000000001'; }
    return __awaiter(this, void 0, void 0, function () {
        var paymentVoucher, finished, transaction, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieving Payment...");
                    paymentVoucher = 'PV000000000001';
                    if (payment_vouch !== '') {
                        paymentVoucher = payment_vouch;
                    }
                    finished = false;
                    transaction = cont.createTransaction('retrievePayment');
                    return [4 /*yield*/, transaction.evaluate(paymentVoucher)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    finished = true; // usually set to true by the handler above
                    // new JSONObject(json).toString(2)
                    console.log('Transaction has been evaluated, result is: ');
                    console.log(JSON.parse(result.toString()));
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRequestEL(cont, gw) {
    return __awaiter(this, void 0, void 0, function () {
        var finished, request, transaction, requeststring;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Submit Export License Request...");
                    finished = false;
                    request = new ExportLicense_1.ExportLicense(randDocNumber("EL"), util_1["default"].formatDateYMD(new Date()), 'Sphinx Furniture Design & Manufacturing Services', randCourier(), randDescriptionOfGoods());
                    transaction = cont.createTransaction('requestEL');
                    requeststring = Buffer.from(JSON.stringify(request));
                    return [4 /*yield*/, transaction.submit(requeststring.toString())];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    console.log("EL request " + request.request_id + " has been submitted");
                    finished = true; // usually set to true by the handler above
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function testRetrieveEL(cont, gw, reqID) {
    return __awaiter(this, void 0, void 0, function () {
        var requestID, finished, transaction, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieving Export License Request...");
                    requestID = 'REL121-0001';
                    if (reqID !== '') {
                        requestID = reqID;
                    }
                    finished = false;
                    transaction = cont.createTransaction('retrieveEL');
                    return [4 /*yield*/, transaction.evaluate(requestID)];
                case 1:
                    result = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!!finished) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 3:
                    _a.sent();
                    finished = true; // usually set to true by the handler above
                    console.log('Transaction has been evaluated, result is: ');
                    console.log(JSON.parse(result.toString()));
                    // console.log(JSON.stringify(JSON.parse(result.toString()), null, 2));
                    gw.disconnect();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function randDocNumber(docType) {
    var rand_p1 = "";
    var rand_p2 = "";
    var result = "";
    switch (docType) {
        case 'OR':
            //'OR'
            // format cyymm-99999
            rand_p1 = String((new Date().getUTCFullYear()) - 1900).concat(("00" + ((new Date().getUTCMonth() + 1).toString().trim())).slice(-2));
            rand_p2 = ("00" + new Date().getUTCDate().toString().trim()).slice(-2) + String(Math.floor(Math.random() * 9999) + 1);
            result = rand_p1 + "-" + rand_p2;
            break;
        case 'WA':
            //'WA'
            rand_p1 = 'WA' + String((new Date().getUTCFullYear()) - 1900);
            rand_p2 = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
            result = rand_p1 + "-" + rand_p2;
            break;
        case 'EL':
            //'EL'
            rand_p1 = 'REL' + String((new Date().getUTCFullYear()) - 1900);
            rand_p2 = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
            result = rand_p1 + "-" + rand_p2;
            break;
        case 'PV':
            //'PV'
            rand_p1 = 'PV';
            rand_p2 = ("00000000000000" + String(Math.floor(Math.random() * 999999) + 1)).slice(-14);
            result = rand_p1 + rand_p2;
            break;
        case 'IN':
            //'IN'
            rand_p1 = 'INV-';
            rand_p2 = ("0000000" + String(Math.floor(Math.random() * 9999999) + 1)).slice(-7);
            result = rand_p1 + rand_p2;
            break;
        case 'PR':
            // Payment Reference
            rand_p1 = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
            rand_p2 = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
            result = rand_p1 + rand_p2;
            break;
        case 'PN':
            // PayNow
            // "PAYN"
            rand_p1 = 'PAYN000' + String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            rand_p2 = ("0000000" + String(Math.floor(Math.random() * 9999999) + 1)).slice(-7);
            result = rand_p1 + rand_p2;
            break;
        default:
            // Generate any 6 characters digit
            rand_p1 = ("000" + String(Math.floor(Math.random() * 999) + 1)).slice(-3);
            rand_p2 = ("000" + String(Math.floor(Math.random() * 999) + 1)).slice(-3);
            result = rand_p1 + rand_p2;
    }
    return result;
}
function randFirstName() {
    var someFirstName = ["Alan", "Aaron", "Benny", "Bernard", "Charlie", "Yaohan", "Henry", "Don",
        "Denny", "Eric", "Frankit", "Gerald", "Gabriel", "John", "Jimmy", "Junxiong", "Weichong", "Xavier",
        "Timothy", "Simon", "Vincent", "Nicholas", "Mark", "Yongfa", "Donald"];
    return someFirstName[Math.floor(Math.random() * someFirstName.length)];
}
function randLastName() {
    var someLastName = ["Tan", "Lim", "Neo", "Wong", "Holmes", "Gate", "Trump", "Yap",
        "Dong", "Er", "Fong", "Gong", "Gim", "Jiang", "James", "Bey", "Yao", "Chua",
        "Tian", "Sim", "Heng", "Lee", "Chin"];
    return someLastName[Math.floor(Math.random() * someLastName.length)];
}
function randStreetName() {
    var houseNo = String(Math.floor(Math.random() * 9999) + 1);
    var streetName = ['Cheow Keng Road', 'Jalan Hajijah', 'Kay Poh Road', 'Keris Estate Roads',
        'Makepeace Road', 'Rotan Lane', 'Tampines Road', 'New Changi Road', 'Old Changi Road',
        'Telok Blangah Road', 'Henderson Road', 'Tiong Bahru Road', 'Tao Ching Road', 'Tah Ching Road',
        'Tamah Jurong', 'Jalan Jurong Kechi', 'Jalan Bukit Merah'];
    return houseNo + " " + streetName[Math.floor(Math.random() * streetName.length)];
}
function randUnitNumber() {
    var floor = "#" + String(Math.floor(Math.random() * 35) + 2);
    var unit = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
    return floor + "-" + unit;
}
function randPhoneNumber() {
    return String(Math.floor(Math.random() * 99999999) + 80000000);
}
function randCourier() {
    var courier = ["DHL", "Fedex", "UPS", "DTDC", "Chola Cargo & Courier",
        "Ohio Express Int. P/L", "Linpet International"];
    return courier[Math.floor(Math.random() * courier.length)];
}
function randDescriptionOfGoods() {
    var descOfGoods = ["Furniture-Cupboard (3 doors, 180cmx45cmX180cm, Rose Wood)",
        "Furniture-Designer Sofa (3+2 seats,model:002,G.Leather)",
        "Furniture-Dining Table (Grenadil w/4 dining chairs-Grenadil)",
        "Furniture-Sofa Bench (3 seaters, Black wood-Ebony)"];
    return descOfGoods[Math.floor(Math.random() * descOfGoods.length)];
}
function randManufacturer() {
    var manufacturer = ["Wei Rong Manufacturing", "Hayier Furniture Factory",
        "LHL Furniture Manufacturing Service Int.", "Cordia Furniture Manufacturing",
        "T&L Furniture Production"];
    return manufacturer[Math.floor(Math.random() * manufacturer.length)];
}
function randProdModel() {
    var someSuffix = ["SF", "TX", "CX", "BE", "CY", "DH", "FJ", "GK", "RQ", "KL"];
    var rand_p1 = String(Math.floor(Math.random() * 99) + 1);
    var rand_p2 = (("000000" + String(Math.floor(Math.random() * 999999) + 1)).slice(-6)) + someSuffix[Math.floor(Math.random() * someSuffix.length)];
    return rand_p1.concat("-", rand_p2);
}
function randWarrantyPeriod() {
    var somePeriod = [6, 12, 24, 36, 48, 60];
    return somePeriod[Math.floor(Math.random() * somePeriod.length)];
}
function randCustomer() {
    var rand_p1 = String((new Date().getUTCFullYear()) - 1900);
    var rand_p2 = (("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4));
    return rand_p1.concat(rand_p2);
}
function randInstruction() {
    var instructions = ["please deliver on weekend only",
        "please deliver on weekday only",
        "please call 2 hours in advance for delivery",
        "n/a",
        "security clearance is necessary"
    ];
    return instructions[Math.floor(Math.random() * instructions.length)];
}
function randPayType() {
    var payType = ["visa", "master", "amex", "diners", "nets"];
    return payType[Math.floor(Math.random() * payType.length)];
}
function randSettlementBank() {
    var settBank = ["OCBC Bank", "DBS Bank Limited", "HSBC", "Citibank Singapore Limited", "UOB Limited"];
    return settBank[Math.floor(Math.random() * settBank.length)];
}
function randMaterialOrigin(matIndex) {
    var origin = ['Amazon rainforest - Columbia',
        'Amazon rainforest - Brazil', 'Congo Rainforest - Central Africa rapublic',
        'Congo Rainforest - Republic of Congo', 'Atlantic Forest - Brazil',
        'Atlantic Forest - Argentina', 'Atlantic Forest - Paraguay',
        'Valdivian Temperate Rainforest - Chile', 'Valdivian Temperate Rainforest - Argentina',
        'Tongass National Forest - United States', 'Rainforest of Xishuangbanna - China',
        'Sunderbans - India', 'Sunderbans - Bangladesh', 'Daintree Rainforest - Australia',
        'Kinabalu Park - Malaysia', 'Garibaldi Provincial Park - British Columbia',
        'Broadleaf forest - Bhutan', 'Biogradska forest - Montenegro', 'Tywi Forest - Wales, UK'];
    return matIndex !== null ? origin[matIndex] : origin[Math.floor(Math.random() * origin.length)];
}
function prepConnection(connectionProfile, connectionOptions, gateway, network, contract) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, gateway.connect(connectionProfile, connectionOptions)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, gateway.getNetwork('sphinx-channel')];
                case 2:
                    network = _a.sent();
                    contract = network.getContract('sphinx-contract');
                    return [2 /*return*/];
            }
        });
    });
}
