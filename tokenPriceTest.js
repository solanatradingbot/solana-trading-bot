const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

(async () => {
  try {
    // Connect to QuickNode endpoint
    const connection = new web3.Connection(
      "https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/"
    );

    // Define wallet address
    const walletAddress = new web3.PublicKey("3TQKQGNjGcoJdWoaP91TdvoS6jVS3MS5uYftfzoA8C6e");

    // Fetch token accounts owned by this wallet
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
      programId: splToken.TOKEN_PROGRAM_ID,
    });

    // Display token balances
    console.log(`Token balances for wallet: ${walletAddress.toString()}`);
    tokenAccounts.value.forEach((account) => {
      const tokenInfo = account.account.data.parsed.info;
      const mintAddress = tokenInfo.mint;
      const tokenBalance = tokenInfo.tokenAmount.uiAmount;

      console.log(`- Token Mint Address: ${mintAddress}`);
      console.log(`  Balance: ${tokenBalance}`);
    });
  } catch (error) {
    console.error("Error fetching token balances:", error);
  }
})();
