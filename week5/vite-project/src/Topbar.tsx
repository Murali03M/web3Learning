export default function Topbar() {
   return (
     <div className="bg-gradient-to-r from-slate-950 to-blue-700 flex flex-row items-center justify-center py-4">
       <img
         src="https://faucet.solana.com/_next/static/media/solanaLogo.74d35f7a.svg"
         alt="Solana Logo"
         className="h-12 w-12 mr-3"
       />
       <div className="text-white text-lg font-semibold">Devnet Faucet</div>
     </div>
   );
 }
 