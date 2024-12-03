// src/components/staking/WithdrawForm.tsx
import { useState } from 'react';
import { formatEther, parseEther } from 'viem';

interface WithdrawFormProps {
    onWithdraw: (amount: string) => void;
    maxAmount: bigint;
    isLoading: boolean;
}

export const WithdrawForm = ({ onWithdraw, maxAmount, isLoading }: WithdrawFormProps) => {
    const [amount, setAmount] = useState('');

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Withdraw CAFI</h3>
            <div className="space-y-4">
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Amount to withdraw"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    onClick={() => onWithdraw(amount)}
                    disabled={isLoading || !amount || parseEther(amount || '0') > maxAmount}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                            Withdrawing...
                        </div>
                    ) : (
                        'Withdraw'
                    )}
                </button>
            </div>
            <p className="text-sm text-gray-500">
                Staked: {formatEther(maxAmount)} CAFI
            </p>
        </div>
    );
};
