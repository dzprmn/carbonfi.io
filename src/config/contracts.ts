//src/config/contracts.ts
import { StakingABI, ERC20ABI } from './abis';

export const CONTRACTS = {
    STAKING: {
        address: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS as `0x${string}`,
        abi: StakingABI,
    },
    CAFI: {
        address: import.meta.env.VITE_CAFI_TOKEN_ADDRESS as `0x${string}`,
        abi: ERC20ABI,
    },
} as const;