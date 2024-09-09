import {  useState } from 'react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardHeader, CardContent, CardFooter } from './components/ui/card'; // Adjust path as needed
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import Airdrop from './Airdrop';
import ShowBalance from './showBalance';

export function Wallet() {
    const [balanceUpdated, setBalanceUpdated] = useState(false);

    const handleAirdropSuccess = () => {
        setBalanceUpdated(prev => !prev); 
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-gray-50">
            <Card className="w-[350px] max-w-md">
                <CardHeader>
                    <div className="text-center mb-4 flex flex-col gap-2">
                        <WalletMultiButton style={{ width: '100%', backgroundColor: 'black', color: 'white' }} />
                        <WalletDisconnectButton style={{ backgroundColor: 'black', color: 'white' }} />
                    </div>
                </CardHeader>
                <CardContent>
                    <Airdrop onAirdropSuccess={handleAirdropSuccess} />
                    <ShowBalance updateTrigger={balanceUpdated} />
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <Link to="/sign-message"><Button>Sign Message</Button></Link> 
                    <Link to="/send-solana"><Button>Send Solana</Button></Link>
                </CardFooter>
            </Card>
        </div>
    );
}
