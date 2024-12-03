// src/scripts/verifyBridgeBasic.ts
import { createPublicClient, http, formatEther, parseEther } from 'viem';
import { sepolia, bscTestnet } from 'viem/chains';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Minimal ABI with just the functions we need
const BRIDGE_ABI = [
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
    // Custom errors
    {
        type: 'error',
        name: 'InvalidAddress',
        inputs: []
    },
    {
        type: 'error',
        name: 'InvalidAmount',
        inputs: []
    },
    {
        type: 'error',
        name: 'InsufficientBalance',
        inputs: []
    }
] as const;

const TOKEN_ABI = [
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
        inputs: [{ name: 'spender', type: 'address' }],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    }
] as const;

async function verifyBridgeBasic() {
    console.log('Basic Bridge Verification');
    console.log('=======================\n');

    const sepoliaClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC)
    });

    try {
        // 1. Check if the address has code
        const contractCode = await sepoliaClient.getBytecode({
            address: process.env.SEPOLIA_BRIDGE as `0x${string}`
        });

        console.log('Contract Deployment:');
        console.log('-------------------');
        console.log('Bridge Address:', process.env.SEPOLIA_BRIDGE);
        console.log('Has Contract Code:', !!contractCode);

        if (!contractCode) {
            throw new Error('No contract code found at this address');
        }

        // 2. Try to get contract creation info
        const block = await sepoliaClient.getBlock({
            blockNumber: await sepoliaClient.getBlockNumber()
        });

        console.log('\nContract Info:');
        console.log('-------------');
        console.log('Latest Block:', block.number);
        console.log('Chain:', sepolia.name);

        // 3. Print transaction parameters for lockTokens
        const amount = parseEther('1'); // 1 token for testing
        const data = await sepoliaClient.encodeFunctionData({
            abi: BRIDGE_ABI,
            functionName: 'lockTokens',
            args: [process.env.SEPOLIA_TOKEN as `0x${string}`, amount]
        });

        console.log('\nExample lockTokens Transaction:');
        console.log('-----------------------------');
        console.log('To:', process.env.SEPOLIA_BRIDGE);
        console.log('Data:', data);
        console.log('Amount:', formatEther(amount), 'tokens');

        // 4. Print environment setup
        console.log('\nEnvironment Setup:');
        console.log('-----------------');
        console.log('Token Address:', process.env.SEPOLIA_TOKEN);
        console.log('Bridge Address:', process.env.SEPOLIA_BRIDGE);

        return true;
    } catch (error) {
        console.error('\nVerification Error:', error);
        if (error instanceof Error) {
            console.error('Error Message:', error.message);
        }
        throw error;
    }
}

// Run verification
verifyBridgeBasic().catch(console.error);