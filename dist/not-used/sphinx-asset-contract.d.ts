import { Context, Contract } from 'fabric-contract-api';
import { SphinxAsset } from './sphinx-asset';
export declare class SphinxAssetContract extends Contract {
    sphinxAssetExists(ctx: Context, sphinxAssetId: string): Promise<boolean>;
    createSphinxAsset(ctx: Context, sphinxAssetId: string, value: string): Promise<void>;
    readSphinxAsset(ctx: Context, sphinxAssetId: string): Promise<SphinxAsset>;
    updateSphinxAsset(ctx: Context, sphinxAssetId: string, newValue: string): Promise<void>;
    deleteSphinxAsset(ctx: Context, sphinxAssetId: string): Promise<void>;
}
