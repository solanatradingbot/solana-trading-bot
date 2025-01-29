const { Connection, PublicKey } = require("@solana/web3.js");

(async () => {
  try {
    // Replace this with your Bullx Wallet Address
    const walletAddress = "DLhW3QrmYjqaypi3MokujK5FFzu5Fwj73L6ZVcggH3sE";
    const connection = new Connection("https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/");
    const publicKey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(publicKey);
    console.log(`Wallet Balance: ${balance / 1e9} SOL`);
  } catch (error) {
    console.error("Error checking wallet balance:", error);
  }
})();
