const bs58 = require("bs58");
const { Keypair } = require("@solana/web3.js");

// Replace this with your Bullx private key
const privateKeyInput = "2XTDFTRDvEmeg3dBz3TbA6df5BJraaah1ocRKySUb3rS3Uu9rbcWGC6V61Cow8qgWKAXY32NbwgPmk5i9syYd6Xi";

try {
    // Try Base58 Decoding
    const base58DecodedKey = Uint8Array.from(bs58.decode(privateKeyInput));
    const walletBase58 = Keypair.fromSecretKey(base58DecodedKey);
    console.log("Base58 Decoded Key: Works");
    console.log("Wallet Public Key:", walletBase58.publicKey.toBase58());
} catch (error) {
    console.log("Base58 Decoding Failed:", error.message);
}

try {
    // Try Base64 Decoding
    const base64DecodedKey = Uint8Array.from(Buffer.from(privateKeyInput, "base64"));
    const walletBase64 = Keypair.fromSecretKey(base64DecodedKey);
    console.log("Base64 Decoded Key: Works");
    console.log("Wallet Public Key:", walletBase64.publicKey.toBase58());
} catch (error) {
    console.log("Base64 Decoding Failed:", error.message);
}
