// src/scripts/balanceSupply.ts
import { createPublicClient, createWalletClient, http, parseEther, formatEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia, bscTestnet } from 'viem/chains';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Fallback RPCs
const SEPOLIA_FALLBACK_RPCS = [
    process.env.SEPOLIA_RPC,
    'https://eth-sepolia.g.alchemy.com/v2/demo',
    'https://rpc.sepolia.org',
    'https://rpc2.sepolia.org',
];

const BSC_FALLBACK_RPCS = [
    process.env.BSCTESTNET_RPC,
    'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
    'https://data-seed-prebsc-2-s1.bnbchain.org:8545',
    'https://bsc-testnet.public.blastapi.io'
];

const TOKEN_ABI = [
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
        inputs: [{ name: 'account', type: 'address' }],
        name: 'hasRole',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    }
] as const;

const BRIDGE_ABI = [
    // Functions
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
    {
        inputs: [],
        name: 'chainId',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'partnerChainId',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    // Custom Errors
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
        name: 'TransactionProcessed',
        inputs: []
    },
    {
        type: 'error',
        name: 'InvalidSignature',
        inputs: []
    },
    {
        type: 'error',
        name: 'InsufficientBalance',
        inputs: []
    },
    // Events
    {
        type: 'event',
        name: 'TokensLocked',
        inputs: [
            { indexed: true, name: 'from', type: 'address' },
            { indexed: true, name: 'to', type: 'address' },
            { indexed: false, name: 'amount', type: 'uint256' },
            { indexed: false, name: 'nonce', type: 'uint256' },
            { indexed: false, name: 'sourceChain', type: 'uint256' },
            { indexed: false, name: 'targetChain', type: 'uint256' }
        ]
    }
] as const;

async function validateBridgeConfiguration(
    sepoliaClient: any,
    bscClient: any,
    account: string
) {
    console.log('\nValidating bridge configuration...');

    try {
        // Check chain IDs
        const [sepoliaChainId, sepoliaPartnerChainId] = await Promise.all([
            sepoliaClient.readContract({
                address: process.env.SEPOLIA_BRIDGE as `0x${string}`,
                abi: BRIDGE_ABI,
                functionName: 'chainId'
            }),
            sepoliaClient.readContract({
                address: process.env.SEPOLIA_BRIDGE as `0x${string}`,
                abi: BRIDGE_ABI,
                functionName: 'partnerChainId'
            })
        ]);

        const [bscChainId, bscPartnerChainId] = await Promise.all([
            bscClient.readContract({
                address: process.env.BSCTESTNET_BRIDGE as `0x${string}`,
                abi: BRIDGE_ABI,
                functionName: 'chainId'
            }),
            bscClient.readContract({
                address: process.env.BSCTESTNET_BRIDGE as `0x${string}`,
                abi: BRIDGE_ABI,
                functionName: 'partnerChainId'
            })
        ]);

        console.log('Chain ID Configuration:');
        console.log(`Sepolia Bridge: chainId=${sepoliaChainId}, partnerChainId=${sepoliaPartnerChainId}`);
        console.log(`BSC Bridge: chainId=${bscChainId}, partnerChainId=${bscPartnerChainId}`);

        if (sepoliaChainId !== bscPartnerChainId || bscChainId !== sepoliaPartnerChainId) {
            throw new Error('Chain ID configuration mismatch between bridges');
        }

        return true;
    } catch (error) {
        console.error('Bridge configuration validation failed:', error);
        throw error;
    }
}


async function validateEnvironment() {
    const requiredEnvVars = [
        'PRIVATE_KEY',
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
}

function normalizePrivateKey(privateKey: string): `0x${string}` {
    privateKey = privateKey.replace('0x', '');
    if (privateKey.length !== 64) {
        throw new Error('Private key must be 32 bytes (64 hex characters)');
    }
    return `0x${privateKey}` as `0x${string}`;
}

async function setupClients(account: ReturnType<typeof privateKeyToAccount>) {
    const sepoliaPublicClient = createPublicClient({
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC)
    });

    const sepoliaWalletClient = createWalletClient({
        chain: sepolia,
        transport: http(process.env.SEPOLIA_RPC),
        account
    });

    const bscPublicClient = createPublicClient({
        chain: bscTestnet,
        transport: http(process.env.BSCTESTNET_RPC)
    });

    const bscWalletClient = createWalletClient({
        chain: bscTestnet,
        transport: http(process.env.BSCTESTNET_RPC),
        account
    });

    return {
        sepoliaPublicClient,
        sepoliaWalletClient,
        bscPublicClient,
        bscWalletClient
    };
}

async function checkBalances(
    sepoliaPublicClient: any,
    bscPublicClient: any,
    account: string
) {
    // Minimum required balances
    const MIN_ETH = parseEther('0.05'); // 0.05 ETH
    const MIN_BNB = parseEther('0.05'); // 0.05 BNB

    console.log('\nChecking balances for:', account);

    // Check native token balances
    const [sepoliaEthBalance, bscBnbBalance] = await Promise.all([
        sepoliaPublicClient.getBalance({ address: account as `0x${string}` }),
        bscPublicClient.getBalance({ address: account as `0x${string}` })
    ]);

    console.log('\nNative Token Balances:');
    console.log(`Sepolia ETH: ${formatEther(sepoliaEthBalance)} ETH`);
    console.log(`BSC Testnet BNB: ${formatEther(bscBnbBalance)} BNB`);

    // Check if balances are sufficient
    if (sepoliaEthBalance < MIN_ETH) {
        throw new Error(`Insufficient ETH balance on Sepolia.\nRequired: ${formatEther(MIN_ETH)} ETH\nCurrent: ${formatEther(sepoliaEthBalance)} ETH\nPlease get ETH from Sepolia faucet: https://sepoliafaucet.com/`);
    }

    if (bscBnbBalance < MIN_BNB) {
        throw new Error(`Insufficient BNB balance on BSC Testnet.\nRequired: ${formatEther(MIN_BNB)} BNB\nCurrent: ${formatEther(bscBnbBalance)} BNB\nPlease get BNB from: https://testnet.bnbchain.org/faucet-smart`);
    }

    // Check token balances
    const [sepoliaTokenBalance, bscTokenBalance] = await Promise.all([
        sepoliaPublicClient.readContract({
            address: process.env.SEPOLIA_TOKEN as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: 'balanceOf',
            args: [account]
        }),
        bscPublicClient.readContract({
            address: process.env.BSCTESTNET_TOKEN as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: 'balanceOf',
            args: [account]
        })
    ]);

    console.log('\nToken Balances:');
    console.log(`Sepolia CAFI: ${formatEther(sepoliaTokenBalance)} CAFI`);
    console.log(`BSC CAFI: ${formatEther(bscTokenBalance)} CAFI`);

    // Estimate gas for operations
    try {
        const approveGasEstimate = await sepoliaPublicClient.estimateContractGas({
            address: process.env.SEPOLIA_TOKEN as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: 'approve',
            args: [process.env.SEPOLIA_BRIDGE, sepoliaTokenBalance],
            account: account as `0x${string}`
        });

        const gasPrice = await sepoliaPublicClient.getGasPrice();
        const estimatedGasCost = approveGasEstimate * gasPrice;

        console.log('\nEstimated Gas Costs:');
        console.log(`Approve Transaction: ${formatEther(estimatedGasCost)} ETH`);
        console.log(`Available for gas: ${formatEther(sepoliaEthBalance)} ETH`);

        if (sepoliaEthBalance < estimatedGasCost) {
            throw new Error(`Insufficient ETH for gas. Need at least: ${formatEther(estimatedGasCost)} ETH`);
        }
    } catch (error) {
        console.error('Error estimating gas:', error);
        throw error;
    }

    return {
        sepoliaTokenBalance,
        bscTokenBalance,
        sepoliaEthBalance,
        bscBnbBalance
    };
}

async function balanceSupply() {
    try {
        // 1. Validate environment
        await validateEnvironment();
        console.log('Environment variables validated');

        // 2. Setup account
        const normalizedPrivateKey = normalizePrivateKey(process.env.PRIVATE_KEY!);
        const account = privateKeyToAccount(normalizedPrivateKey);
        console.log('Using account:', account.address);

        // 3. Setup clients
        const clients = await setupClients(account);
        const {
            sepoliaPublicClient,
            sepoliaWalletClient,
            bscPublicClient,
            bscWalletClient
        } = clients;

        // 4. Check balances
        const balances = await checkBalances(
            sepoliaPublicClient,
            bscPublicClient,
            account.address
        );

        // 5. Calculate amount to lock
        const AMOUNT_TO_LOCK = balances.sepoliaTokenBalance / 2n;
        console.log(`\nAmount to lock in each bridge: ${formatEther(AMOUNT_TO_LOCK)} CAFI`);

        // 6. Lock tokens on Sepolia
        console.log('\nLocking tokens on Sepolia...');

        console.log('1. Approving Sepolia bridge...');
        const sepoliaApprovalHash = await sepoliaWalletClient.writeContract({
            address: process.env.SEPOLIA_TOKEN as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: 'approve',
            args: [process.env.SEPOLIA_BRIDGE as `0x${string}`, AMOUNT_TO_LOCK]
        });

        await sepoliaPublicClient.waitForTransactionReceipt({
            hash: sepoliaApprovalHash,
            timeout: 60_000
        });
        console.log('✓ Approved Sepolia bridge');

        console.log('2. Locking tokens in Sepolia bridge...');
        const sepoliaLockHash = await sepoliaWalletClient.writeContract({
            address: process.env.SEPOLIA_BRIDGE as `0x${string}`,
            abi: BRIDGE_ABI,
            functionName: 'lockTokens',
            args: [account.address, AMOUNT_TO_LOCK]
        });

        await sepoliaPublicClient.waitForTransactionReceipt({
            hash: sepoliaLockHash,
            timeout: 60_000
        });
        console.log('✓ Locked tokens in Sepolia bridge');

        // 7. Lock tokens on BSC
        console.log('\nLocking tokens on BSC Testnet...');

        console.log('1. Approving BSC bridge...');
        const bscApprovalHash = await bscWalletClient.writeContract({
            address: process.env.BSCTESTNET_TOKEN as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: 'approve',
            args: [process.env.BSCTESTNET_BRIDGE as `0x${string}`, AMOUNT_TO_LOCK]
        });

        await bscPublicClient.waitForTransactionReceipt({
            hash: bscApprovalHash,
            timeout: 60_000
        });
        console.log('✓ Approved BSC bridge');

        console.log('2. Locking tokens in BSC bridge...');
        const bscLockHash = await bscWalletClient.writeContract({
            address: process.env.BSCTESTNET_BRIDGE as `0x${string}`,
            abi: BRIDGE_ABI,
            functionName: 'lockTokens',
            args: [account.address, AMOUNT_TO_LOCK]
        });

        await bscPublicClient.waitForTransactionReceipt({
            hash: bscLockHash,
            timeout: 60_000
        });
        console.log('✓ Locked tokens in BSC bridge');

        // 8. Verify final balances
        console.log('\nVerifying final balances...');
        await checkBalances(sepoliaPublicClient, bscPublicClient, account.address);

    } catch (error) {
        console.error('Error balancing supply:', error);
        if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Stack trace:', error.stack);
        }
        throw error;
    }
}

// Run the script
(async () => {
    try {
        console.log('Starting supply balance process...');
        await balanceSupply();
        console.log('\n✓ Supply balance completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('\n✗ Fatal error during supply balance:', error);
        process.exit(1);
    }
})();