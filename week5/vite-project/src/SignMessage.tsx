import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";

import { ed25519 } from '@noble/curves/ed25519';
import bs58 from 'bs58';
import {  useNavigate } from "react-router-dom";


const SignMessage = () => {
    const [message, setMessage] = useState("");
    const { publicKey, signMessage } = useWallet();
    const navigate = useNavigate();


    const signhandler = async () => {
        
        if (!publicKey) throw new Error("Wallet is not connected");
        if (!signMessage) throw new Error("Wallet does not support signing");

        const encodeMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodeMessage);

        if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
        setMessage("");
        navigate("/")
    };

  return (
    <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Sign Message</CardTitle>
      <CardDescription>Prove ownership of a wallet to a centralised backend.</CardDescription>
    </CardHeader>
          <CardContent>
              <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="name">Message</label>
            <Input id="name" placeholder="Type your message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
          </div>
       
        </div>

    </CardContent>
    <CardFooter className="flex justify-between">
    <Button onClick={signhandler}>Sign Message</Button>
    </CardFooter>
  </Card>

  );
}

export default SignMessage