// src/components/staking/RewardsCard.tsx
import { formatEther } from 'viem';
import { Card } from '../shared/Card';

interface RewardsCardProps {
    pendingRewards: bigint;
    onClaim: () => void;
    isLoading: boolean;
}

export const RewardsCard = ({ pendingRewards, onClaim, isLoading }: RewardsCardProps) => {
    return (
        <Card>
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Rewards</h3>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Pending Rewards</p>
                        <p className="text-2xl font-bold">{formatEther(pendingRewards)} CAFI</p>
                    </div>
                    <button
                        onClick={onClaim}
                        disabled={isLoading || pendingRewards === 0n}
                        className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                                Claiming...
                            </div>
                        ) : (
                            'Claim Rewards'
                        )}
                    </button>
                </div>
            </div>
        </Card>
    );
};