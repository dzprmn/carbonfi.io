import '@rainbow-me/rainbowkit/styles.css';
import {
    connectorsForWallets,
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { http, createConfig } from 'wagmi';
import { arbitrum, sepolia, bsc, bscTestnet } from 'wagmi/chains';

// Define the chains
export const chains = [arbitrum, sepolia, bsc, bscTestnet] as const;

// Configure default wallets
const projectId = '8039ec1d1c03de9db16a8582f81d72b3'; // Replace with your actual project ID
const appName = 'CarbonFi';

const { wallets } = getDefaultWallets({
    appName,
    projectId,
});

const connectors = connectorsForWallets([
    ...wallets,
], {
    appName,
    projectId,
});

// Create the wagmi configuration
export const wagmiConfig = createConfig({
    connectors,
    chains,
    transports: {
        [arbitrum.id]: http(),
        [sepolia.id]: http(),
        [bsc.id]: http(),
        [bscTestnet.id]: http(),
    },
});
