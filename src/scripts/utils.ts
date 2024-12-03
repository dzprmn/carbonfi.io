// src/scripts/utils.ts
import { type Address } from 'viem'

export const TOKEN_ABI = [
    {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;

export const BRIDGE_ABI = [
    {
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        name: 'lockTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;

export interface ChainConfig {
    rpc: string
    token: Address
    bridge: Address
}

export interface NetworkConfig {
    arbitrum: ChainConfig
    bsc: ChainConfig
}

// Load environment variables with validation
export function loadConfig(): NetworkConfig {
    const requiredEnvVars = [
        'ARBITRUM_RPC',
        'BSC_RPC',
        'ARBITRUM_TOKEN',
        'BSC_TOKEN',
        'ARBITRUM_BRIDGE',
        'BSC_BRIDGE',
    ] as const;

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }

    return {
        arbitrum: {
            rpc: process.env.ARBITRUM_RPC!,
            token: process.env.ARBITRUM_TOKEN as Address,
            bridge: process.env.ARBITRUM_BRIDGE as Address,
        },
        bsc: {
            rpc: process.env.BSC_RPC!,
            token: process.env.BSC_TOKEN as Address,
            bridge: process.env.BSC_BRIDGE as Address,
        },
    };
}