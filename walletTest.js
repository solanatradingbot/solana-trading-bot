const web3 = require("@solana/web3.js");

(async () => {
  try {
    // Connect to QuickNode endpoint
    const solana = new web3.Connection(
      "https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/"
    );

    // Define your wallet public address
    const walletAddress = new web3.PublicKey("3TQKQGNjGcoJdWoaP91TdvoS6jVS3MS5uYftfzoA8C6e");

    // Fetch and display SOL balance
    const balance = await solana.getBalance(walletAddress);
    console.log(`Wallet Address: ${walletAddress.toString()}`);
    console.log(`SOL Balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
  }
})();
