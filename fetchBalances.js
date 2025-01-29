const { Connection, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
require("dotenv").config();

const QUICKNODE_RPC = process.env.SOLANA_RPC;
const WALLET_ADDRESS = process.env.BULLX_WALLET_ADDRESS;

(async () => {
  try {
    const connection = new Connection(QUICKNODE_RPC);
    const publicKey = new PublicKey(WALLET_ADDRESS);

    const solBalance = await connection.getBalance(publicKey);
    console.log(`SOL Balance: ${solBalance / LAMPORTS_PER_SOL} SOL`);
  } catch (error) {
    console.error("Error fetching balance:", error.message);
  }
})();
