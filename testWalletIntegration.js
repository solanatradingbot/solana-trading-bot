const { Connection, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

(async () => {
  try {
    const connection = new Connection(process.env.SOLANA_RPC, "confirmed");
    const walletAddress = new PublicKey(process.env.BULLX_WALLET_ADDRESS);

    // Fetch wallet balance
    const balance = await connection.getBalance(walletAddress);
    console.log(
      `Wallet Address: ${walletAddress.toString()}\nBalance: ${balance / 1e9} SOL`
    );
  } catch (error) {
    console.error("Error testing wallet integration:", error);
  }
})();
