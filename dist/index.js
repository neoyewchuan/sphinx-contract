"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = void 0;
// import { SphinxAssetContract } from './sphinx-asset-contract';
// export { SphinxAssetContract } from './sphinx-asset-contract';
// export const contracts: any[] = [ SphinxAssetContract ];
const sphinxcontract = require("./contract/contract");
exports.sphinxcontract = require("./contract/contract");
exports.contracts = [sphinxcontract];
//# sourceMappingURL=index.js.map