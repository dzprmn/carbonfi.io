// src/config/abis.ts
export const StakingABI = [
    {
        inputs: [],
        name: 'getAvailablePeriods',
        outputs: [{ type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ type: 'uint256', name: 'duration' }],
        name: 'getStakingPeriodInfo',
        outputs: [
            { type: 'uint256', name: 'rewardRate' },
            { type: 'uint256', name: 'totalStaked' },
            { type: 'bool', name: 'isActive' }
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ type: 'uint256', name: 'duration' }],
        name: 'getAPR',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { type: 'uint256', name: 'amount' },
            { type: 'uint256', name: 'duration' }
        ],
        name: 'stake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as const;

export const ERC20ABI = [
    {
        inputs: [{ type: 'address', name: 'account' }],
        name: 'balanceOf',
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
] as const;
