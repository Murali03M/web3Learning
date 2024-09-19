import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint } from "@solana/spl-token"


export default function LaunchPad() {


    const { connection } = useConnection();
    const wallet = useWallet();

  const createToken = async () => {
      // Logic to create a token goes here
      const keypair = Keypair.generate();

      const lamports = getMinimumBalanceForRentExemptMint(connection);

      const transaction = new Transaction();
      transaction.add(
          SystemProgram.createAccount(
              {
                fromPubkey: wallet.publicKey!,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports: any,
                programId: TOKEN_PROGRAM_ID,

                  
              }
          

      
          )
      )


    console.log("Token created");
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen w-full flex items-center justify-center">
      <Card className="p-6 w-3/4">
        <CardTitle className="text-2xl font-bold text-center">Solana Token Creator</CardTitle>
        <CardDescription className="text-center mb-6">Easily Create your own Solana SPL Token</CardDescription>
        <CardContent className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="">
            <Label htmlFor="name" className="text-xl">Token Name</Label>
            <Input id="name" placeholder="Enter the name of your token" className="p-3 w-full rounded mt-3" />
          </div>
          <div>
            <Label htmlFor="symbol" className="text-xl" >Token Symbol</Label>
            <Input id="symbol" placeholder="Enter the symbol of your token" className="p-3 w-full rounded mt-3" />
          </div>
          <div>
            <Label htmlFor="imageUrl" className="text-xl" >Image URL</Label>
            <Input id="imageUrl" placeholder="Enter the image URL" className="p-3 w-full rounded mt-3" />
          </div>
          <div>
            <Label htmlFor="initialSupply" className="text-xl" >Initial Supply</Label>
            <Input id="initialSupply" placeholder="Enter the initial supply" className="p-3 w-full rounded mt-3" />
          </div>
        
              </CardContent>
              <CardFooter className="items-center justify-center">
              <Button onClick={createToken} className=" mt-4 flex w-44 ">
            Create Token
                </Button>
              </CardFooter>
            
      </Card>
    </div>
  );
}
function getMinimumBalanceForRentExemptMint(connection: Connection) {
    throw new Error("Function not implemented.");
}

