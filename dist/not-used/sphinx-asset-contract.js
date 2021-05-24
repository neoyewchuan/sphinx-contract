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
exports.SphinxAssetContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const sphinx_asset_1 = require("./sphinx-asset");
let SphinxAssetContract = class SphinxAssetContract extends fabric_contract_api_1.Contract {
    async sphinxAssetExists(ctx, sphinxAssetId) {
        const data = await ctx.stub.getState(sphinxAssetId);
        return (!!data && data.length > 0);
    }
    async createSphinxAsset(ctx, sphinxAssetId, value) {
        const exists = await this.sphinxAssetExists(ctx, sphinxAssetId);
        if (exists) {
            throw new Error(`The sphinx asset ${sphinxAssetId} already exists`);
        }
        const sphinxAsset = new sphinx_asset_1.SphinxAsset();
        sphinxAsset.value = value;
        const buffer = Buffer.from(JSON.stringify(sphinxAsset));
        await ctx.stub.putState(sphinxAssetId, buffer);
    }
    async readSphinxAsset(ctx, sphinxAssetId) {
        const exists = await this.sphinxAssetExists(ctx, sphinxAssetId);
        if (!exists) {
            throw new Error(`The sphinx asset ${sphinxAssetId} does not exist`);
        }
        const data = await ctx.stub.getState(sphinxAssetId);
        const sphinxAsset = JSON.parse(data.toString());
        return sphinxAsset;
    }
    async updateSphinxAsset(ctx, sphinxAssetId, newValue) {
        const exists = await this.sphinxAssetExists(ctx, sphinxAssetId);
        if (!exists) {
            throw new Error(`The sphinx asset ${sphinxAssetId} does not exist`);
        }
        const sphinxAsset = new sphinx_asset_1.SphinxAsset();
        sphinxAsset.value = newValue;
        const buffer = Buffer.from(JSON.stringify(sphinxAsset));
        await ctx.stub.putState(sphinxAssetId, buffer);
    }
    async deleteSphinxAsset(ctx, sphinxAssetId) {
        const exists = await this.sphinxAssetExists(ctx, sphinxAssetId);
        if (!exists) {
            throw new Error(`The sphinx asset ${sphinxAssetId} does not exist`);
        }
        await ctx.stub.deleteState(sphinxAssetId);
    }
};
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxAssetContract.prototype, "sphinxAssetExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], SphinxAssetContract.prototype, "createSphinxAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    fabric_contract_api_1.Returns('SphinxAsset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxAssetContract.prototype, "readSphinxAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], SphinxAssetContract.prototype, "updateSphinxAsset", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], SphinxAssetContract.prototype, "deleteSphinxAsset", null);
SphinxAssetContract = __decorate([
    fabric_contract_api_1.Info({ title: 'SphinxAssetContract', description: 'My Smart Contract' })
], SphinxAssetContract);
exports.SphinxAssetContract = SphinxAssetContract;
//# sourceMappingURL=sphinx-asset-contract.js.map