import { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import ShowBalance from './ShowBalance';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';

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
                            <CardHeader color="white" className="relative h-20"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <h3 className="text-white text-xl">Solana Wallet</h3>
                                </div>
                            </CardHeader>

                            <CardBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <div className="text-center mb-4">
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
