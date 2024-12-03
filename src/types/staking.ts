// src/types/staking.ts
export interface StakingInfo {
    stakedAmount: bigint;
    stakingStartTime: bigint;
    pendingRewards: bigint;
    apr: bigint;
}

export interface StakingStats {
    totalStaked: bigint;
    totalRewards: bigint;
    stakersCount: bigint;
}

export interface StakeFormProps {
    onStake: (amount: string) => void;
    maxAmount: bigint;
    isLoading: boolean;
}

export interface WithdrawFormProps {
    onWithdraw: (amount: string) => void;
    maxAmount: bigint;
    isLoading: boolean;
}

export type StakerInfoResponse = readonly [bigint, bigint, bigint];