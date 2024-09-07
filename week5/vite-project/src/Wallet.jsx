import { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './Airdrop';
import ShowBalance from './ShowBalance';

export function Wallet() {
    const wallets = useMemo(
        () => [
            new UnsafeBurnerWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={"https://devnet.helius-rpc.com/?api-key=bbba508a-8a83-457b-b652-6ccb8fe1775f"}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className='flex flex-col justify-center items-center space-y-6 p-6'>
                        <div className="flex space-x-4">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        <Airdrop />
                        <ShowBalance />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
