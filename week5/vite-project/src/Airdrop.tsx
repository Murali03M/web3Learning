import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FC, useState } from 'react';

interface AirdropProps {
    onAirdropSuccess: () => void; // Callback to trigger balance update
}

const Airdrop: FC<AirdropProps> = ({ onAirdropSuccess }) => {
    const [amount, setAmount] = useState<number>(0);
    const wallet = useWallet();
    const { connection } = useConnection();

    const airdropHandler = async () => {
        if (!wallet.publicKey) {
            alert('Please connect your wallet.');
            return;
        }

        if (amount <= 0) {
            alert('Please enter a valid amount greater than 0.');
            return;
        }

        try {
            const txId = await connection.requestAirdrop(wallet.publicKey, amount * 1000000000); // 1 SOL = 1,000,000,000 lamports
            alert(`Airdrop requested. Transaction ID: ${txId}`);
            onAirdropSuccess(); 
        } catch (error) {
            console.error('Airdrop failed:', error);
            alert('Airdrop failed. Check the console for more details.');
        }
    };

    return (
        <div className="flex flex-row items-center justify-center space-x-4 mb-4">
            <input
                type="number"
                placeholder="Amount"
                className="border p-2 text-center rounded w-32"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
                type="button"
                onClick={airdropHandler}
                className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Request Airdrop
            </button>
        </div>
    );
};

export default Airdrop;
