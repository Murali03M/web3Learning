
import {

    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export default function Wallet() 
{
    return <div className='p-2'> 
        <WalletMultiButton style={{ backgroundColor:"#1d3557" }}/>
        </div>
}