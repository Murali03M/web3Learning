import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import SignMessage from './SignMessage';
import { SendTokens } from './sendTokens';
import Topbar from './Topbar';
import Footer from './Footer';
import { Wallet } from './Wallet';


export const App = () => {


    return (
        <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=bbba508a-8a83-457b-b652-6ccb8fe1775f">
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <Router>
                        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-blue-700 flex flex-col">
                            <Topbar />
                            <div className="flex-grow flex justify-center items-center">
                                <Routes>
                                    <Route path="/" element={<Wallet />} />
                                    <Route path="/sign-message" element={<SignMessage />} />
                                    <Route path="/send-solana" element={<SendTokens />} />
                                </Routes>
                            </div>
                            <Footer />
                        </div>
                    </Router>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
