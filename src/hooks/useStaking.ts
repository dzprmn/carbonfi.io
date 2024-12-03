// src/hooks/useStaking.ts
import { useState, useEffect } from 'react';
import {
    useAccount,
    useReadContract,
    useReadContracts,
    useWriteContract,
    useWatchContractEvent,
} from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACTS } from '../config/contracts';
import { StakingABI, ERC20ABI } from '../config/abis';

export interface StakingPeriod {
    duration: number;
    rewardRate: bigint;
    totalStaked: bigint;
    isActive: boolean;
    apr: number;
}

export interface UserStakeInfo {
    amount: bigint;
    startTime: bigint;
    rewards: bigint;
    pendingRewards: bigint;
}

interface UserStakes {
    [duration: number]: UserStakeInfo;
}

export const useMultiStaking = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [stakingPeriods, setStakingPeriods] = useState<StakingPeriod[]>([]);
    const [userStakes, setUserStakes] = useState<UserStakes>({});
    const { address, isConnected } = useAccount();

    // Read available staking periods
    const { data: availablePeriods } = useReadContract({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        functionName: 'getAvailablePeriods',
    });

    // Read token balance
    const { data: tokenBalance } = useReadContract({
        address: CONTRACTS.CAFI.address,
        abi: ERC20ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
    });

    // Read period information
    const { data: periodData } = useReadContracts({
        contracts: availablePeriods ?
            [...(availablePeriods as readonly bigint[])].flatMap((duration) => [
                {
                    address: CONTRACTS.STAKING.address,
                    abi: StakingABI,
                    functionName: 'getStakingPeriodInfo',
                    args: [duration]
                },
                {
                    address: CONTRACTS.STAKING.address,
                    abi: StakingABI,
                    functionName: 'getAPR',
                    args: [duration]
                }
            ]) : [],
    });

    // Process staking period information
    useEffect(() => {
        if (!availablePeriods || !periodData) return;

        try {
            const periods: StakingPeriod[] = [];
            const periodsArray = availablePeriods as readonly bigint[];

            for (let i = 0; i < periodsArray.length; i++) {
                const periodInfoResult = periodData[i * 2];
                const aprResult = periodData[i * 2 + 1];

                if (
                    periodInfoResult?.status === 'success' &&
                    aprResult?.status === 'success' &&
                    periodInfoResult.result &&
                    aprResult.result
                ) {
                    const [rewardRate, totalStaked, isActive] = periodInfoResult.result as [bigint, bigint, boolean];
                    const apr = aprResult.result as bigint;

                    periods.push({
                        duration: Number(periodsArray[i]),
                        rewardRate,
                        totalStaked,
                        isActive,
                        apr: Number(apr) / 100,
                    });
                }
            }

            setStakingPeriods(periods);
        } catch (error) {
            console.error('Error processing staking periods:', error);
        }
    }, [availablePeriods, periodData]);

    // Contract write functions
    const { writeContract: stake, isPending: isStaking } = useWriteContract();
    const { writeContract: withdraw, isPending: isWithdrawing } = useWriteContract();
    const { writeContract: claimReward, isPending: isClaiming } = useWriteContract();

    const handleStake = async (amount: string, duration: number) => {
        try {
            setIsLoading(true);
            stake({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'stake',
                args: [parseEther(amount), BigInt(duration)],
            });
        } catch (error) {
            console.error('Staking error:', error);
            setIsLoading(false);
        }
    };

    const handleWithdraw = async (amount: string, duration: number) => {
        try {
            setIsLoading(true);
            withdraw({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'withdraw',
                args: [parseEther(amount), BigInt(duration)],
            });
        } catch (error) {
            console.error('Withdrawal error:', error);
            setIsLoading(false);
        }
    };

    const handleClaimRewards = async (duration: number) => {
        try {
            setIsLoading(true);
            claimReward({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'claimRewards',
                args: [BigInt(duration)],
            });
        } catch (error) {
            console.error('Claim error:', error);
            setIsLoading(false);
        }
    };

    // Watch for events
    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'Staked',
        onLogs: () => setIsLoading(false),
    });

    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'Withdrawn',
        onLogs: () => setIsLoading(false),
    });

    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'RewardsClaimed',
        onLogs: () => setIsLoading(false),
    });

    return {
        isConnected,
        isLoading: isLoading || isStaking || isWithdrawing || isClaiming,
        stakingPeriods,
        userStakes,
        tokenBalance: tokenBalance ?? 0n,
        handleStake,
        handleWithdraw,
        handleClaimRewards,
    };
};