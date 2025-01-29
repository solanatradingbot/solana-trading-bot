const { Connection, clusterApiUrl } = require("@solana/web3.js");

(async () => {
  try {
    // Create a connection to the Solana cluster (using your QuickNode endpoint)
    const connection = new Connection("https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/");
    const slot = await connection.getSlot();
    console.log(`Current Slot: ${slot}`);
  } catch (error) {
    console.error("Error fetching slot:", error);
  }
})();
