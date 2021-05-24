"use strict";
function randDocNumber(docType) {
    let rand_p1 = "";
    let rand_p2 = "";
    let result = "";
    switch (docType) {
        case 'OR':
            //'OR'
            // format cyymm-99999
            rand_p1 = String((new Date().getUTCFullYear()) - 1900).concat(("00" + (new Date().getUTCMonth().toString().trim())).slice(-2));
            rand_p2 = ("00" + new Date().getUTCDate().toString().trim()).slice(-2) + String(Math.floor(Math.random() * 9999) + 1);
            result = rand_p1 + "-" + rand_p2;
            break;
        case 'WA':
            //'WA'
            rand_p1 = 'WA' + String((new Date().getUTCFullYear()) - 1900);
            rand_p2 = String(Math.floor(Math.random() * 9999) + 1);
            result = rand_p1 + "-" + rand_p2;
            break;
        case 'EL':
            //'EL'
            rand_p1 = 'REL' + String((new Date().getUTCFullYear()) - 1900);
            rand_p2 = String(Math.floor(Math.random() * 9999) + 1);
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
console.log(`OR ${randDocNumber("OR")}`);
console.log(`IN ${randDocNumber("IN")}`);
console.log(`WA ${randDocNumber("WA")}`);
console.log(`PR ${randDocNumber("PR")}`);
console.log(`PN ${randDocNumber("PN")}`);
console.log(`EL ${randDocNumber("EL")}`);
console.log(`IN ${randDocNumber("PV")}`);
console.log(`IN ${randDocNumber("")}`);
console.log(`Customer ${randCustomer()}`);
console.log(`Product Model ${randProdModel()}`);
//# sourceMappingURL=test.js.map