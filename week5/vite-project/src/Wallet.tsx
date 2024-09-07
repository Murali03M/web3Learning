import { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import ShowBalance from './showBalance';
import { Card, CardBody } from '@material-tailwind/react';

export function Wallet() {
    const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], []);

    const [balanceUpdated, setBalanceUpdated] = useState(false);

    const handleAirdropSuccess = () => {
        setBalanceUpdated((prev) => !prev); 
    };

    return (
        <ConnectionProvider endpoint={"https://devnet.helius-rpc.com/?api-key=bbba508a-8a83-457b-b652-6ccb8fe1775f"}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="flex justify-center items-center min-h-screen bg-blue-gray-50">
                        <Card className="w-full max-w-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="text-center mb-4 flex flex-row gap-2">
                                    <WalletMultiButton />
                                    <WalletDisconnectButton />
                                </div>
                                <Airdrop onAirdropSuccess={handleAirdropSuccess} />
                                <ShowBalance updateTrigger={balanceUpdated} />
                            </CardBody>
                        </Card>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
