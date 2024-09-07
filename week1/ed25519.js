import { utils, getPublicKeyAsync, signAsync, verifyAsync } from "@noble/ed25519";

async function main() {
    const privateKey = utils.randomPrivateKey();
    console.log(privateKey);
    const message = new TextEncoder().encode("hello world");
    console.log("message: " + message);
    const publicKey = await getPublicKeyAsync(privateKey);
    console.log("publicKey: " + publicKey);
    const signature = await signAsync(message, privateKey);
    console.log("signature: " + signature);
    const isValid = await verifyAsync(signature, message, publicKey); 

    console.log(isValid);
}




main()