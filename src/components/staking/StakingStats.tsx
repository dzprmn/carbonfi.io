// src/components/staking/StakingStats.tsx
import { formatEther } from 'viem';
import { Card } from '../shared/Card';

interface StakingStatsProps {
    stakingInfo: {
        stakedAmount: bigint;
        stakingStartTime: bigint;
        pendingRewards: bigint;
        apr: bigint;
    };
}

export const StakingStats = ({ stakingInfo }: StakingStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <div className="p-4">
                    <h3 className="text-sm text-gray-500">Staked Amount</h3>
                    <p className="text-2xl font-bold">{formatEther(stakingInfo.stakedAmount)} CAFI</p>
                </div>
            </Card>
            <Card>
                <div className="p-4">
                    <h3 className="text-sm text-gray-500">Pending Rewards</h3>
                    <p className="text-2xl font-bold">{formatEther(stakingInfo.pendingRewards)} CAFI</p>
                </div>
            </Card>
            <Card>
                <div className="p-4">
                    <h3 className="text-sm text-gray-500">Current APR</h3>
                    <p className="text-2xl font-bold">{Number(stakingInfo.apr) / 100}%</p>
                </div>
            </Card>
        </div>
    );
};