"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_network_1 = require("fabric-network");
const path = require("path");
const fs = require("fs");
require("source-map-support/register");
const Order_1 = require("../model/Order");
const Store_1 = require("../model/Store");
const Address_1 = require("../model/Address");
const Furniture_1 = require("../model/Furniture");
const Customer_1 = require("../model/Customer");
const Payment_1 = require("../model/Payment");
const Drawing_1 = require("../model/Drawing");
const util_1 = require("../Util/util");
const ExportLicense_1 = require("../model/ExportLicense");
const readLineSync = require('readline-sync');
let selOption;
async function main() {
    try {
        // Check for parameter for a ran option, if none was provided, default to '2' - testRetriveOrder
        selOption = (process.argv[2] !== undefined) ? process.argv[2] : '2'; // TODO change
        const walletPath = path.join(process.cwd(), 'Sphinx_Wallet');
        const wallet = await fabric_network_1.Wallets.newFileSystemWallet(walletPath);
        //console.log(walletPath);
        const gateway = new fabric_network_1.Gateway();
        const connectionProfilePath = path.resolve(__dirname, '../../', 'SphinxChannelConnection.json');
        const connectionProfile = JSON.parse(fs.readFileSync(connectionProfilePath, 'utf8')); // eslintdisable-line @typescript-eslint/no-unsafe-assignment
        const connectionOptions = {
            wallet, identity: 'sphinxadmin', discovery: { enabled: true, asLocalhost: false }
        };
        // await gateway.connect(connectionProfile, connectionOptions);
        // const network: Network = await gateway.getNetwork('sphinx-channel');
        // const contract: Contract = network.getContract('sphinx-contract');
        let network;
        let contract;
        let userInput;
        switch (selOption) {
            // 1 - testCreateOrder
            // 2 - testRetrieveOrder
            // 3 - testRegisterWarranty
            // 4 - testRetrieveWarranty
            // 5 - testMakePayment
            // 6 - testRetrievePayment
            // 7 - testRequestEL
            // 8 - testRetrieveEL
            case '1':
                console.clear();
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testCreateOrder(contract, gateway);
                break;
            case '2':
                console.clear();
                let order_id = '12104-278971';
                userInput = readLineSync.question(`\nEnter an order id (default is ${order_id}) :`);
                if (userInput !== '') {
                    order_id = userInput;
                }
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRetrieveOrder(contract, gateway, order_id);
                break;
            case '3':
                console.clear();
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRegisterWarranty(contract, gateway);
                break;
            case '4':
                console.clear();
                let warranty_id = 'WA121-6031';
                userInput = readLineSync.question(`\nEnter an order id (default is ${warranty_id}) :`);
                if (userInput !== '') {
                    warranty_id = userInput;
                }
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRetrieveWarranty(contract, gateway, warranty_id);
                break;
            case '5':
                console.clear();
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testMakePayment(contract, gateway);
                break;
            case '6':
                console.clear();
                let payment_vouch = 'PV00000000864792';
                userInput = readLineSync.question(`\nEnter a payment voucher # (default is ${payment_vouch}) :`);
                if (userInput !== "") {
                    payment_vouch = userInput;
                }
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRetrievePayment(contract, gateway, payment_vouch);
                break;
            case '7':
                console.clear();
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRequestEL(contract, gateway);
                break;
            case '8':
                console.clear();
                let el_request_id = 'REL121-3894';
                userInput = readLineSync.question(`\nEnter a export license request id (default is ${el_request_id}) :`);
                if (userInput !== "") {
                    el_request_id = userInput;
                }
                await gateway.connect(connectionProfile, connectionOptions);
                network = await gateway.getNetwork('sphinx-channel');
                contract = network.getContract('sphinx-contract');
                testRetrieveEL(contract, gateway, el_request_id);
                break;
            case '9':
                console.clear();
                let warrantyStart = util_1.default.formatDateYMD(new Date());
                userInput = readLineSync.question(`\nEnter a Warranty start Date in yyyy-mm-dd (default is ${warrantyStart}) :`);
                if (userInput !== "") {
                    warrantyStart = userInput;
                }
                let warrantyPeriod = '12';
                userInput = readLineSync.question(`\nEnter the Warranty period (no. of months, default is ${warrantyPeriod}) :`);
                if (userInput !== "") {
                    warrantyPeriod = userInput;
                }
                calculateWarrantyEndDate(warrantyStart, warrantyPeriod);
                break;
            default:
                console.clear();
                console.log("No valid run option is specified, please run 'node app.ts {1|2|3|4|5}'..");
        }
    }
    catch (error) {
        console.error('Failed to call transaction:', error);
        process.exit(0);
    }
}
void main();
async function testCreateOrder(cont, gw) {
    console.log("Creating Order...");
    let finished = false;
    const orderNumber = randDocNumber("OR");
    const txnDate = util_1.default.formatDateYMD(new Date());
    const custAddr = new Address_1.Address('home', randStreetName(), randUnitNumber(), '', '', 'Singapore', 'SG', randDocNumber(""));
    const order = new Order_1.Order(orderNumber, txnDate, "retail", new Store_1.Store('SG001', 'Sphinx Experience Store', new Address_1.Address('001', '1 Heaven Road', '#01-07/08/09', '', '', 'Singapore', 'SG', '123456')), [new Furniture_1.Furniture('001', '001', '001', '002', '002', randMaterialOrigin(), 120, 60, 108, 0, 0, 0, new Drawing_1.Drawing())], new Customer_1.Customer(randCustomer(), randFirstName(), randLastName(), custAddr, custAddr, randPhoneNumber(), ''), randInstruction(), new Payment_1.Payment(orderNumber, randPayType(), randDocNumber("PR"), Math.floor(Math.random() * 9999) + 1000, 0, txnDate), '');
    const transaction = cont.createTransaction('createOrder');
    let orderstring = Buffer.from(JSON.stringify(order));
    await transaction.submit(orderstring.toString());
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Order ${order.order_id} for customer ${order.customer.first_name} has been submitted`);
        finished = true; // usually set to true by the handler above
        gw.disconnect();
    }
}
async function testRetrieveOrder(cont, gw, order_id = '') {
    console.log("Retrieving Order...");
    let orderid = '12104-000001';
    if (order_id !== '') {
        orderid = order_id;
    }
    let finished = false;
    const transaction = cont.createTransaction('retrieveOrder');
    const result = await transaction.evaluate(orderid);
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        finished = true; // usually set to true by the handler above
        console.log('Transaction has been evaluated, result is: ');
        console.log(JSON.parse(result.toString()));
        gw.disconnect();
    }
}
async function testRegisterWarranty(cont, gw) {
    console.log("Registering Warranty...");
    let finished = false;
    const transaction = cont.createTransaction('registerWarranty');
    const warrantyId = randDocNumber("WA");
    const productModel = randProdModel();
    const warrantyPeriod = randWarrantyPeriod(); // 36-months
    const warrantyStart = util_1.default.formatDateYMD(new Date());
    const customerId = randCustomer();
    await transaction.submit(warrantyId, productModel, warrantyPeriod.toString(), warrantyStart, customerId);
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Warranty ${warrantyId} has been submitted`);
        finished = true; // usually set to true by the handler above
        gw.disconnect();
    }
}
async function testRetrieveWarranty(cont, gw, warranty_id = '') {
    console.log("Retrieving Warranty...");
    let warrantyId = 'WA121-1357';
    if (warranty_id !== '') {
        warrantyId = warranty_id;
    }
    let finished = false;
    const transaction = cont.createTransaction('retrieveWarranty');
    const result = await transaction.evaluate(warrantyId);
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        finished = true; // usually set to true by the handler above
        console.log('Transaction has been evaluated, result is: ');
        console.log(JSON.parse(result.toString()));
        //console.log(`Transaction has been evaluated, result is: ${JSONstringify(result.toString())}`);
        gw.disconnect();
    }
}
function calculateWarrantyEndDate(warStart, warPeriod) {
    const theWarPeriod = parseInt(warPeriod);
    console.log("");
    console.log(`The expiration date for warranty (of date ${warStart}) with ${warPeriod}-mths period is ` + util_1.default.calculateWarrantyEndDate(warStart, theWarPeriod));
}
async function testMakePayment(cont, gw) {
    console.log("Make Payment...");
    let finished = false;
    const payment = new Payment_1.AcctPayment(randDocNumber("IN"), 'PayNow', randDocNumber("PN"), Math.floor(Math.random() * 50000) + 2000, 0, util_1.default.formatDateYMD(new Date()), randManufacturer(), randDocNumber("PV"), randSettlementBank());
    const transaction = cont.createTransaction('makePayment');
    let paymentstring = Buffer.from(JSON.stringify(payment));
    await transaction.submit(paymentstring.toString());
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Payment ${payment.pay_vref} has been submitted`);
        finished = true; // usually set to true by the handler above
        gw.disconnect();
    }
}
async function testRetrievePayment(cont, gw, payment_vouch = 'PAY000000000001') {
    console.log("Retrieving Payment...");
    let paymentVoucher = 'PV000000000001';
    if (payment_vouch !== '') {
        paymentVoucher = payment_vouch;
    }
    let finished = false;
    const transaction = cont.createTransaction('retrievePayment');
    const result = await transaction.evaluate(paymentVoucher);
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        finished = true; // usually set to true by the handler above
        // new JSONObject(json).toString(2)
        console.log('Transaction has been evaluated, result is: ');
        console.log(JSON.parse(result.toString()));
        gw.disconnect();
    }
}
async function testRequestEL(cont, gw) {
    console.log("Submit Export License Request...");
    let finished = false;
    const request = new ExportLicense_1.ExportLicense(randDocNumber("EL"), util_1.default.formatDateYMD(new Date()), 'Sphinx Furniture Design & Manufacturing Services', randCourier(), randDescriptionOfGoods());
    const transaction = cont.createTransaction('requestEL');
    let requeststring = Buffer.from(JSON.stringify(request));
    await transaction.submit(requeststring.toString());
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`EL request ${request.request_id} has been submitted`);
        finished = true; // usually set to true by the handler above
        gw.disconnect();
    }
}
async function testRetrieveEL(cont, gw, reqID) {
    console.log("Retrieving Export License Request...");
    let requestID = 'REL121-0001';
    if (reqID !== '') {
        requestID = reqID;
    }
    let finished = false;
    const transaction = cont.createTransaction('retrieveEL');
    const result = await transaction.evaluate(requestID);
    while (!finished) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        finished = true; // usually set to true by the handler above
        console.log('Transaction has been evaluated, result is: ');
        console.log(JSON.parse(result.toString()));
        // console.log(JSON.stringify(JSON.parse(result.toString()), null, 2));
        gw.disconnect();
        //gateway.disconnect();
    }
}
function randDocNumber(docType) {
    let rand_p1 = "";
    let rand_p2 = "";
    let result = "";
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
    const someFirstName = ["Alan", "Aaron", "Benny", "Bernard", "Charlie", "Yaohan", "Henry", "Don",
        "Denny", "Eric", "Frankit", "Gerald", "Gabriel", "John", "Jimmy", "Junxiong", "Weichong", "Xavier",
        "Timothy", "Simon", "Vincent", "Nicholas", "Mark", "Yongfa", "Donald"];
    return someFirstName[Math.floor(Math.random() * someFirstName.length)];
}
function randLastName() {
    const someLastName = ["Tan", "Lim", "Neo", "Wong", "Holmes", "Gate", "Trump", "Yap",
        "Dong", "Er", "Fong", "Gong", "Gim", "Jiang", "James", "Bey", "Yao", "Chua",
        "Tian", "Sim", "Heng", "Lee", "Chin"];
    return someLastName[Math.floor(Math.random() * someLastName.length)];
}
function randStreetName() {
    const houseNo = String(Math.floor(Math.random() * 9999) + 1);
    const streetName = ['Cheow Keng Road', 'Jalan Hajijah', 'Kay Poh Road', 'Keris Estate Roads',
        'Makepeace Road', 'Rotan Lane', 'Tampines Road', 'New Changi Road', 'Old Changi Road',
        'Telok Blangah Road', 'Henderson Road', 'Tiong Bahru Road', 'Tao Ching Road', 'Tah Ching Road',
        'Tamah Jurong', 'Jalan Jurong Kechi', 'Jalan Bukit Merah'];
    return houseNo + " " + streetName[Math.floor(Math.random() * streetName.length)];
}
function randUnitNumber() {
    const floor = "#" + String(Math.floor(Math.random() * 35) + 2);
    const unit = ("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4);
    return floor + "-" + unit;
}
function randPhoneNumber() {
    return String(Math.floor(Math.random() * 99999999) + 80000000);
}
function randCourier() {
    const courier = ["DHL", "Fedex", "UPS", "DTDC", "Chola Cargo & Courier",
        "Ohio Express Int. P/L", "Linpet International"];
    return courier[Math.floor(Math.random() * courier.length)];
}
function randDescriptionOfGoods() {
    const descOfGoods = ["Furniture-Cupboard (3 doors, 180cmx45cmX180cm, Rose Wood)",
        "Furniture-Designer Sofa (3+2 seats,model:002,G.Leather)",
        "Furniture-Dining Table (Grenadil w/4 dining chairs-Grenadil)",
        "Furniture-Sofa Bench (3 seaters, Black wood-Ebony)"];
    return descOfGoods[Math.floor(Math.random() * descOfGoods.length)];
}
function randManufacturer() {
    const manufacturer = ["Wei Rong Manufacturing", "Hayier Furniture Factory",
        "LHL Furniture Manufacturing Service Int.", "Cordia Furniture Manufacturing",
        "T&L Furniture Production"];
    return manufacturer[Math.floor(Math.random() * manufacturer.length)];
}
function randProdModel() {
    const someSuffix = ["SF", "TX", "CX", "BE", "CY", "DH", "FJ", "GK", "RQ", "KL"];
    let rand_p1 = String(Math.floor(Math.random() * 99) + 1);
    let rand_p2 = (("000000" + String(Math.floor(Math.random() * 999999) + 1)).slice(-6)) + someSuffix[Math.floor(Math.random() * someSuffix.length)];
    return rand_p1.concat("-", rand_p2);
}
function randWarrantyPeriod() {
    const somePeriod = [6, 12, 24, 36, 48, 60];
    return somePeriod[Math.floor(Math.random() * somePeriod.length)];
}
function randCustomer() {
    const rand_p1 = String((new Date().getUTCFullYear()) - 1900);
    const rand_p2 = (("0000" + String(Math.floor(Math.random() * 9999) + 1)).slice(-4));
    return rand_p1.concat(rand_p2);
}
function randInstruction() {
    const instructions = ["please deliver on weekend only",
        "please deliver on weekday only",
        "please call 2 hours in advance for delivery",
        "n/a",
        "security clearance is necessary"
    ];
    return instructions[Math.floor(Math.random() * instructions.length)];
}
function randPayType() {
    const payType = ["visa", "master", "amex", "diners", "nets"];
    return payType[Math.floor(Math.random() * payType.length)];
}
function randSettlementBank() {
    const settBank = ["OCBC Bank", "DBS Bank Limited", "HSBC", "Citibank Singapore Limited", "UOB Limited"];
    return settBank[Math.floor(Math.random() * settBank.length)];
}
function randMaterialOrigin() {
    const origin = ['Amazon rainforest - Columbia',
        'Amazon rainforest - Brazil', 'Congo Rainforest - Central Africa rapublic',
        'Congo Rainforest - Republic of Congo', 'Atlantic Forest - Brazil',
        'Atlantic Forest - Argentina', 'Atlantic Forest - Paraguay',
        'Valdivian Temperate Rainforest - Chile', 'Valdivian Temperate Rainforest - Argentina',
        'Tongass National Forest - United States', 'Rainforest of Xishuangbanna - China',
        'Sunderbans - India', 'Sunderbans - Bangladesh', 'Daintree Rainforest - Australia',
        'Kinabalu Park - Malaysia', 'Garibaldi Provincial Park - British Columbia',
        'Broadleaf forest - Bhutan', 'Biogradska forest - Montenegro', 'Tywi Forest - Wales, UK'];
    return origin[Math.floor(Math.random() * origin.length)];
}
async function prepConnection(connectionProfile, connectionOptions, gateway, network, contract) {
    await gateway.connect(connectionProfile, connectionOptions);
    network = await gateway.getNetwork('sphinx-channel');
    contract = network.getContract('sphinx-contract');
}
//# sourceMappingURL=app.js.map