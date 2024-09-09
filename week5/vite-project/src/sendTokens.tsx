import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardHeader } from "./components/ui/card";
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";


export function SendTokens() {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // Ensure Buffer is defined
    window.Buffer = Buffer;

    const sendTokens = async () => {
        if (!publicKey) {
            alert("Please connect your wallet.");
            return;
        }

        // Validate inputs
        if (!to || !amount) {
            alert("Please fill in both fields.");
            return;
        }

       

        const recipientPubkey = new PublicKey(to);
        const transferAmount = parseFloat(amount);

        if (isNaN(transferAmount) || transferAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            setLoading(true);

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: recipientPubkey,
                    lamports: transferAmount * LAMPORTS_PER_SOL,
                })
            );

            const latestBlockhash = await connection.getLatestBlockhash();
            transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
            transaction.recentBlockhash = latestBlockhash.blockhash;


            const signature = await sendTransaction(transaction, connection);

            alert(`Sent ${amount} SOL to ${to}. Transaction Signature: ${signature}`);
            setTo("");
            navigate("/");
        
        } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Check the console for more details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-[350px] p-3">
            <CardHeader>
                <h2 className="text-bold">Send Solana</h2>
            </CardHeader>
            <Input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <Button
                onClick={sendTokens}
                disabled={loading}
                className="p-2"
            >
                {loading ? 'Sending...' : 'Send'}
            </Button>
        </Card>
    );
}
