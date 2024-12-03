// src/components/staking/StakingDashboard.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Container } from '../shared/Container';
import { StakingCard } from './StakingCard';
import { useMultiStaking } from '../../hooks/useStaking';
import { Loader2 } from 'lucide-react';
import { formatEther } from 'viem';
import { Card } from '../shared/Card';

export const StakingDashboard = () => {
    const {
        isConnected,
        isLoading,
        stakingPeriods,
        tokenBalance,
        userStakes,
        handleStake,
        handleWithdraw,
        handleClaimRewards,
    } = useMultiStaking();

    // Calculate totals with null checks
    const totalValueStaked = stakingPeriods.reduce(
        (acc, period) => acc + Number(period.totalStaked),
        0
    );

    // Calculate user's total staked amount
    const userTotalStaked = Object.values(userStakes).reduce(
        (acc, stake) => acc + Number(stake.amount),
        0
    );

    // Calculate total pending rewards
    const totalPendingRewards = Object.values(userStakes).reduce(
        (acc, stake) => acc + Number(stake.pendingRewards),
        0
    );

    if (!isConnected) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome to CarbonFi Staking</h1>
                        <p className="text-gray-500 text-center max-w-md">
                            Connect your wallet to start earning rewards by staking your CAFI tokens
                        </p>
                        <ConnectButton />
                    </div>
                </Container>
            </div>
        );
    }

    if (isLoading || !stakingPeriods || stakingPeriods.length === 0) {
        return (
            <Container>
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-gray-500">Loading staking options...</p>
                </div>
            </Container>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <Container>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Staking Dashboard</h1>
                            <p className="text-gray-500 mt-2">Choose a staking period and earn rewards</p>
                        </div>
                        <ConnectButton />
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Total Value Staked</h3>
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {formatEther(BigInt(totalValueStaked))} CAFI
                                </p>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Your Total Staked</h3>
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {formatEther(BigInt(userTotalStaked))} CAFI
                                </p>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-sm font-medium text-gray-500">Pending Rewards</h3>
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {formatEther(BigInt(totalPendingRewards))} CAFI
                                </p>
                            </div>
                        </Card>
                    </div>

                    {/* Staking Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stakingPeriods.map((period) => (
                            <StakingCard
                                key={period.duration}
                                period={period}
                                userStakeInfo={userStakes[period.duration]}
                                onStake={handleStake}
                                onWithdraw={handleWithdraw}
                                onClaim={handleClaimRewards}
                                maxStakeAmount={tokenBalance}
                                isLoading={isLoading}
                            />
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">How Staking Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stake Tokens</h3>
                                <p className="text-gray-600">
                                    Choose your preferred staking period. Longer staking periods offer higher APR rates.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Rewards</h3>
                                <p className="text-gray-600">
                                    Earn CAFI tokens as rewards. Rewards are calculated per second and can be claimed anytime.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal</h3>
                                <p className="text-gray-600">
                                    Withdraw your tokens after the staking period ends. Early withdrawal is not available.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default StakingDashboard;