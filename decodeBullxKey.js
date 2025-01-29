// Import the required libraries
const { Keypair } = require("@solana/web3.js"); // Solana SDK for wallet management
const bs58 = require("bs58"); // Library for Base58 encoding/decoding
require("dotenv").config(); // Load environment variables from .env file

try {
    // Fetch the Base58-encoded private key from the environment variable
    const base58PrivateKey = process.env.BULLX_PRIVATE_KEY;

    // Ensure the private key exists
    if (!base58PrivateKey) {
        throw new Error("BULLX_PRIVATE_KEY is not defined in the .env file");
    }

    // Decode the Base58-encoded private key into a Uint8Array
    const secretKey = bs58.decode(base58PrivateKey);

    // Create a Keypair using the decoded private key
    const wallet = Keypair.fromSecretKey(secretKey);

    // Log the wallet's public key to verify successful decoding
    console.log("Wallet Public Key:", wallet.publicKey.toBase58());
} catch (error) {
    console.error("Error decoding Bullx private key:", error.message);
}
