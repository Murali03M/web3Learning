import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState, useEffect } from "react";

interface ShowBalanceProps {
    updateTrigger: boolean; // Triggers balance refresh
}

export default function ShowBalance({ updateTrigger }: ShowBalanceProps) {
    const [balance, setBalance] = useState<number | null>(null);
    const { connection } = useConnection();
    const wallet = useWallet();

    useEffect(() => {
        const getBalance = async () => {
            if (wallet.publicKey) {
                try {
                    const balance = await connection.getBalance(wallet.publicKey) / LAMPORTS_PER_SOL;
                    setBalance(balance);
                } catch (error) {
                    console.error("Failed to fetch balance", error);
                    setBalance(null);
                }
            } else {
                setBalance(null);
            }
        };

        getBalance();
    }, [wallet.publicKey, connection, updateTrigger]); // Update balance whenever updateTrigger changes

    return (
        <div className="flex text-lg justify-center items-center flex-col mt-4 p-4 bg-gray-100 rounded shadow">
            {wallet.publicKey ? (
                <div className="font-semibold text-gray-800">
                    Balance: {balance !== null ? `${balance.toFixed(2)} SOL` : "Loading..."}
                </div>
            ) : (
                <div className="text-red-500">Please connect your wallet to see the balance.</div>
            )}


        </div>
    );
}
