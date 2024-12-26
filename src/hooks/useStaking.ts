// src/hooks/useStaking.ts
import { useState, useEffect } from 'react';
import {
    useAccount,
    useReadContract,
    useReadContracts,
    useWriteContract,
    useWatchContractEvent,
    useChainId,
} from 'wagmi';
import { parseEther } from 'viem';
import { CONTRACTS } from '../config/contracts';
import { StakingABI } from '../config/abis';

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
    const [isLoadingStakePeriods, setIsLoadingStakePeriods] = useState(true);
    const [isLoadingUserStakes, setIsLoadingUserStakes] = useState(false);
    const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
    const [stakingPeriods, setStakingPeriods] = useState<StakingPeriod[]>([]);
    const [userStakes, setUserStakes] = useState<UserStakes>({});

    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const isCorrectNetwork = chainId === CONTRACTS.chainId;

    // Read available staking periods
    const {
        data: availablePeriods,
        isError: periodsError,
        error: periodsErrorData,
        isLoading: isPeriodsLoading
    } = useReadContract({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        functionName: 'getAvailablePeriods',
        chainId: chainId,
    });

    // Monitor contract interactions and loading state
    useEffect(() => {
        console.log('Contract Connection Status:', {
            contractAddress: CONTRACTS.STAKING.address,
            walletAddress: address,
            chainId,
            isConnected,
            periodsError: periodsError ? periodsErrorData : null
        });

        if (!isPeriodsLoading || periodsError) {
            setIsLoadingStakePeriods(false);
        }
    }, [
        address,
        chainId,
        isConnected,
        periodsError,
        periodsErrorData,
        isPeriodsLoading
    ]);

    // Read period information
    const { data: periodData } = useReadContracts({
        contracts: availablePeriods ?
            (availablePeriods as readonly bigint[]).map((duration) => ([
                {
                    address: CONTRACTS.STAKING.address,
                    abi: StakingABI,
                    functionName: 'getStakingPeriodInfo',
                    args: [duration],
                    chainId: chainId,
                },
                {
                    address: CONTRACTS.STAKING.address,
                    abi: StakingABI,
                    functionName: 'getAPR',
                    args: [duration],
                    chainId: chainId,
                }
            ])).flat() : [],
        query: {
            enabled: Boolean(availablePeriods?.length)
        }
    });

    // Process staking period information
    useEffect(() => {
        console.log('Period Processing Debug:', {
            rawAvailablePeriods: availablePeriods,
            rawPeriodData: periodData,
            isDataPresent: Boolean(availablePeriods && periodData)
        });

        if (!availablePeriods || !periodData) {
            console.log('Missing required data for period processing');
            return;
        }

        try {
            const periodsArray = availablePeriods as readonly bigint[];

            console.log('Processing Data:', {
                periodsCount: periodsArray.length,
                periodDataCount: periodData.length,
                periodsArray: periodsArray.map(p => p.toString())
            });

            const periods: StakingPeriod[] = [];

            for (let i = 0; i < periodsArray.length; i++) {
                const periodInfoResult = periodData[i * 2];
                const aprResult = periodData[i * 2 + 1];

                console.log(`Processing Period ${i}:`, {
                    duration: periodsArray[i].toString(),
                    periodInfo: periodInfoResult?.result,
                    apr: aprResult?.result,
                    status: {
                        periodInfoSuccess: periodInfoResult?.status === 'success',
                        aprSuccess: aprResult?.status === 'success'
                    }
                });

                if (
                    periodInfoResult?.status === 'success' &&
                    aprResult?.status === 'success' &&
                    periodInfoResult.result &&
                    aprResult.result
                ) {
                    const [rewardRate, totalStaked, isActive] = periodInfoResult.result as [bigint, bigint, boolean];
                    const apr = (aprResult.result as readonly bigint[])[0];

                    console.log(`Period ${i} Details:`, {
                        duration: Number(periodsArray[i]),
                        rewardRate: rewardRate.toString(),
                        totalStaked: totalStaked.toString(),
                        isActive,
                        apr: Number(apr) / 100
                    });

                    periods.push({
                        duration: Number(periodsArray[i]),
                        rewardRate,
                        totalStaked,
                        isActive,
                        apr: Number(apr) / 100,
                    });
                }
            }

            console.log('Final Processed Periods:', {
                count: periods.length,
                periods: periods.map(p => ({
                    duration: p.duration,
                    isActive: p.isActive,
                    apr: p.apr
                }))
            });

            setStakingPeriods(periods);
        } catch (error) {
            console.error('Period Processing Error:', {
                error,
                errorMessage: error instanceof Error ? error.message : 'Unknown error'
            });
            setStakingPeriods([]);
        }
    }, [availablePeriods, periodData]);

    // Read user stakes
    const { data: userStakesData } = useReadContracts({
        contracts: stakingPeriods.map((period) => ({
            address: CONTRACTS.STAKING.address,
            abi: StakingABI,
            functionName: 'getUserStakeInfo',
            args: address ? [address, BigInt(period.duration)] : undefined,
            chainId: chainId,
        })),
        query: {
            enabled: Boolean(address && stakingPeriods.length > 0),
        },
    });

    // Process user stakes data
    useEffect(() => {
        setIsLoadingUserStakes(true);

        if (!userStakesData || !stakingPeriods.length || !address) {
            setIsLoadingUserStakes(false);
            return;
        }

        try {
            const newUserStakes: UserStakes = {};
            userStakesData.forEach((stakeData, index) => {
                if (stakeData?.status === 'success' && stakeData.result) {
                    const [amount, startTime, rewards, pendingRewards] = stakeData.result as [bigint, bigint, bigint, bigint];

                    if (amount > 0n) {
                        newUserStakes[stakingPeriods[index].duration] = {
                            amount,
                            startTime,
                            rewards,
                            pendingRewards,
                        };
                    }
                }
            });

            console.log('User Stakes Update:', {
                stakesCount: Object.keys(newUserStakes).length,
                stakes: newUserStakes
            });

            setUserStakes(newUserStakes);
        } catch (error) {
            console.error('User Stakes Processing Error:', error);
        } finally {
            setIsLoadingUserStakes(false);
        }
    }, [userStakesData, stakingPeriods, address]);

    // Contract write functions
    const { writeContract, isPending: isWritePending } = useWriteContract();

    const handleStake = async (amount: string, duration: number) => {
        try {
            setIsLoadingTransaction(true);
            writeContract({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'stake',
                args: [parseEther(amount), BigInt(duration)],
            });
        } catch (error) {
            console.error('Staking Transaction Error:', error);
            setIsLoadingTransaction(false);
        }
    };

    const handleWithdraw = async (amount: string, duration: number) => {
        try {
            setIsLoadingTransaction(true);
            writeContract({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'withdraw',
                args: [parseEther(amount), BigInt(duration)],
            });
        } catch (error) {
            console.error('Withdrawal Transaction Error:', error);
            setIsLoadingTransaction(false);
        }
    };

    const handleClaimRewards = async (duration: number) => {
        try {
            setIsLoadingTransaction(true);
            writeContract({
                address: CONTRACTS.STAKING.address,
                abi: StakingABI,
                functionName: 'claimRewards',
                args: [BigInt(duration)],
            });
        } catch (error) {
            console.error('Claim Rewards Transaction Error:', error);
            setIsLoadingTransaction(false);
        }
    };

    // Watch for events
    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'Staked',
        onLogs: () => setIsLoadingTransaction(false),
    });

    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'Withdrawn',
        onLogs: () => setIsLoadingTransaction(false),
    });

    useWatchContractEvent({
        address: CONTRACTS.STAKING.address,
        abi: StakingABI,
        eventName: 'RewardsClaimed',
        onLogs: () => setIsLoadingTransaction(false),
    });

    return {
        isConnected,
        isLoading: isLoadingStakePeriods || isLoadingUserStakes || isLoadingTransaction || isPeriodsLoading || isWritePending,
        stakingPeriods,
        userStakes,
        tokenBalance: 0n,
        handleStake,
        handleWithdraw,
        handleClaimRewards,
        isCorrectNetwork,
        chainId,
    };
};