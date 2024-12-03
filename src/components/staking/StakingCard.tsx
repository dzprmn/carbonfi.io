// src/components/staking/StakingCard.tsx
import { useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { Card } from '../shared/Card';
import type { StakingPeriod, UserStakeInfo } from '@/hooks/useStaking.ts';

interface StakingCardProps {
    period: StakingPeriod;
    userStakeInfo?: UserStakeInfo;
    onStake: (amount: string, duration: number) => void;
    onWithdraw: (amount: string, duration: number) => void;
    onClaim: (duration: number) => void;
    maxStakeAmount: bigint;
    isLoading: boolean;
}

export const StakingCard = ({
                                period,
                                userStakeInfo,
                                onStake,
                                onWithdraw,
                                onClaim,
                                maxStakeAmount,
                                isLoading,
                            }: StakingCardProps) => {
    const [stakeAmount, setStakeAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [activeTab, setActiveTab] = useState<'stake' | 'withdraw'>('stake');

    const formatDuration = (seconds: number) => {
        const days = seconds / (24 * 60 * 60);
        return `${days} Days`;
    };

    const canWithdraw = userStakeInfo && userStakeInfo.amount > 0n;
    const hasRewards = userStakeInfo && userStakeInfo.pendingRewards > 0n;

    return (
        <Card className="w-full">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">{formatDuration(period.duration)}</h3>
                        <p className="text-sm text-gray-500">APR: {period.apr}%</p>
                    </div>
                    {hasRewards && (
                        <button
                            onClick={() => onClaim(period.duration)}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                        >
                            Claim {formatEther(userStakeInfo.pendingRewards)} CAFI
                        </button>
                    )}
                </div>

                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('stake')}
                        className={`flex-1 px-4 py-2 text-sm rounded-lg ${
                            activeTab === 'stake'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Stake
                    </button>
                    <button
                        onClick={() => setActiveTab('withdraw')}
                        className={`flex-1 px-4 py-2 text-sm rounded-lg ${
                            activeTab === 'withdraw'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Withdraw
                    </button>
                </div>

                {activeTab === 'stake' ? (
                    <div className="space-y-4">
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amount to stake"
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            onClick={() => {
                                onStake(stakeAmount, period.duration);
                                setStakeAmount('');
                            }}
                            disabled={isLoading || !stakeAmount || parseEther(stakeAmount || '0') > maxStakeAmount}
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Staking...' : 'Stake'}
                        </button>
                        <p className="text-sm text-gray-500">
                            Available: {formatEther(maxStakeAmount)} CAFI
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Amount to withdraw"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            disabled={isLoading || !canWithdraw}
                        />
                        <button
                            onClick={() => {
                                onWithdraw(withdrawAmount, period.duration);
                                setWithdrawAmount('');
                            }}
                            disabled={
                                isLoading ||
                                !withdrawAmount ||
                                !canWithdraw ||
                                parseEther(withdrawAmount || '0') > (userStakeInfo?.amount ?? 0n)
                            }
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Withdrawing...' : 'Withdraw'}
                        </button>
                        <p className="text-sm text-gray-500">
                            Staked: {formatEther(userStakeInfo?.amount ?? 0n)} CAFI
                        </p>
                    </div>
                )}

                {userStakeInfo && userStakeInfo.amount > 0n && (
                    <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-semibold mb-2">Your Stake</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>Amount: {formatEther(userStakeInfo.amount)} CAFI</p>
                            <p>
                                Start Time:{' '}
                                {new Date(Number(userStakeInfo.startTime) * 1000).toLocaleDateString()}
                            </p>
                            <p>Pending Rewards: {formatEther(userStakeInfo.pendingRewards)} CAFI</p>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};