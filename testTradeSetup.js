const { Connection, Keypair } = require("@solana/web3.js");
const fetch = require("node-fetch");
require("dotenv").config();

// Initialize Solana connection using QuickNode RPC
const connection = new Connection(process.env.SOLANA_RPC);

// Load Bullx wallet from private key
const privateKey = Uint8Array.from(Buffer.from(process.env.WALLET_PRIVATE_KEY, "base58"));
const wallet = Keypair.fromSecretKey(privateKey);

// Define input/output tokens and trade parameters
const inputMint = "So11111111111111111111111111111111111111112"; // Wrapped SOL (WSOL)
const outputMint = "Es9vMFrzaCER1Rz9pe3tXXis2zsRk2r1frGjRrb9ToA"; // USDC
const amount = 1000000; // Amount in lamports (1 WSOL = 1,000,000 lamports)
const slippage = 1; // 1% slippage tolerance

(async () => {
  try {
    // Fetch wallet balance
    const balance = await connection.getBalance(wallet.publicKey);
    console.log(`Wallet Balance: ${(balance / 1e9).toFixed(4)} SOL`);

    // Fetch trade route from Jupiter API
    const quoteUrl = `${process.env.JUPITER_API}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippage=${slippage}`;
    console.log(`Fetching trade route from Jupiter: ${quoteUrl}`);

    const quoteResponse = await fetch(quoteUrl);
    const quoteData = await quoteResponse.json();

    // Check if valid trade route is available
    if (!quoteData.data || quoteData.data.length === 0) {
      console.log("No trade route found.");
      return;
    }

    // Display trade details
    const bestRoute = quoteData.data[0];
    console.log("Trade Details:");
    console.log(`  Price Impact: ${(bestRoute.priceImpactPct * 100).toFixed(2)}%`);
    console.log(`  Expected Output: ${(bestRoute.outAmount / 1e6).toFixed(2)} USDC`);

    // OPTIONAL: Execute trade (requires Jupiter swap endpoint and signed transaction)
    console.log("Trade simulation successful. Execution requires signed transaction.");
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
