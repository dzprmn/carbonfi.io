// src/constants/placeholderData.ts
export const PLACEHOLDER_STAKING_PERIODS = [
    {
        duration: 2592000, // 30 days
        rewardRate: BigInt(1000000),
        totalStaked: BigInt(5000000000000000000n), // 5 CAFI
        isActive: true,
        apr: 12.5
    },
    {
        duration: 7776000, // 90 days
        rewardRate: BigInt(2000000),
        totalStaked: BigInt(15000000000000000000n), // 15 CAFI
        isActive: true,
        apr: 18.75
    },
    {
        duration: 15552000, // 180 days
        rewardRate: BigInt(3000000),
        totalStaked: BigInt(25000000000000000000n), // 25 CAFI
        isActive: true,
        apr: 25.0
    },
    {
        duration: 31536000, // 365 days
        rewardRate: BigInt(4000000),
        totalStaked: BigInt(50000000000000000000n), // 50 CAFI
        isActive: true,
        apr: 32.5
    }
];

export const PLACEHOLDER_USER_STAKES = {
    2592000: {
        amount: BigInt(0), // 1 CAFI
        startTime: BigInt(Math.floor(Date.now() / 1000)),
        rewards: BigInt(0), // 0.1 CAFI
        pendingRewards: BigInt(0) // 0.05 CAFI
    }
};