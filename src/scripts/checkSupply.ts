// src/scripts/checkSupply.ts
import { createPublicClient, http, formatEther } from 'viem';
import { sepolia, bscTestnet } from 'viem/chains';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

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
] as const;

async function checkSupply() {
    // Validate environment variables
    const requiredEnvVars = [
        'SEPOLIA_RPC',
        'BSCTESTNET_RPC',
        'SEPOLIA_TOKEN',
        'BSCTESTNET_TOKEN',
        'SEPOLIA_BRIDGE',
        'BSCTESTNET_BRIDGE'
    ];

    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }

    // Setup clients
    const sepoliaClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC)
    });

    const bscClient = createPublicClient({
        chain: bscTestnet,
        transport: http(process.env.BSCTESTNET_RPC)
    });

    try {
        console.log('Checking Sepolia token:', process.env.SEPOLIA_TOKEN);
        console.log('Checking BSC Testnet token:', process.env.BSCTESTNET_TOKEN);

        // Get total supply from both chains
        const [sepoliaSupply, bscSupply] = await Promise.all([
            sepoliaClient.readContract({
                address: process.env.SEPOLIA_TOKEN as `0x${string}`,
                abi: TOKEN_ABI,
                functionName: 'totalSupply'
            }),
            bscClient.readContract({
                address: process.env.BSCTESTNET_TOKEN as `0x${string}`,
                abi: TOKEN_ABI,
                functionName: 'totalSupply'
            })
        ]);

        console.log('\nCurrent Supply Distribution:');
        console.log(`Sepolia Supply: ${formatEther(sepoliaSupply)} CAFI`);
        console.log(`BSC Testnet Supply: ${formatEther(bscSupply)} CAFI`);
        console.log(`Total Supply across chains: ${formatEther(sepoliaSupply + bscSupply)} CAFI`);

        console.log('\nContract Addresses:');
        console.log('Sepolia:');
        console.log(`- Token: ${process.env.SEPOLIA_TOKEN}`);
        console.log(`- Bridge: ${process.env.SEPOLIA_BRIDGE}`);
        console.log('BSC Testnet:');
        console.log(`- Token: ${process.env.BSCTESTNET_TOKEN}`);
        console.log(`- Bridge: ${process.env.BSCTESTNET_BRIDGE}`);

        return {
            sepoliaSupply,
            bscSupply
        };
    } catch (error) {
        console.error('Error checking supply:', error);
        // More detailed error logging
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
            });
        }
        throw error;
    }
}

// Self-invoking async function with better error handling
(async () => {
    try {
        console.log('Starting supply check...');
        await checkSupply();
        console.log('Supply check completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Fatal error during supply check:', error);
        process.exit(1);
    }
})();