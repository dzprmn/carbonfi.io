// src/config/index.ts
import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    ARBITRUM_RPC: process.env.ARBITRUM_RPC,
    BSC_RPC: process.env.BSC_RPC,
    ARBITRUM_TOKEN: process.env.ARBITRUM_TOKEN as `0x${string}`,
    BSC_TOKEN: process.env.BSC_TOKEN as `0x${string}`,
    ARBITRUM_BRIDGE: process.env.ARBITRUM_BRIDGE as `0x${string}`,
    BSC_BRIDGE: process.env.BSC_BRIDGE as `0x${string}`,
    PRIVATE_KEY: process.env.PRIVATE_KEY as `0x${string}`
};