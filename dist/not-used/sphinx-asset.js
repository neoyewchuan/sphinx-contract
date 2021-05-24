"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
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
exports.SphinxAsset = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let SphinxAsset = class SphinxAsset {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SphinxAsset.prototype, "value", void 0);
SphinxAsset = __decorate([
    fabric_contract_api_1.Object()
], SphinxAsset);
exports.SphinxAsset = SphinxAsset;
//# sourceMappingURL=sphinx-asset.js.map