
import './App.css'
// wallet adapter imports
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Navbar from './components/navbar';


function App() {


  return (
    <div>
      <ConnectionProvider endpoint='https://devnet.helius-rpc.com/?api-key=bbba508a-8a83-457b-b652-6ccb8fe1775f'>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Navbar/>
          </WalletModalProvider>
          </WalletProvider>

      </ConnectionProvider>
      
     </div>
  )
}

export default App
