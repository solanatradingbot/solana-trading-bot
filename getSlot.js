// Import the Solana SDK
const web3 = require("@solana/web3.js");

// Async function to connect to the Solana blockchain and fetch the current slot
(async () => {
    try {
        // Connect to the Solana blockchain using your QuickNode endpoint
        const solana = new web3.Connection("https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22/");
        
        // Fetch and log the current slot number
        console.log("Current Slot Number:", await solana.getSlot());
    } catch (error) {
        console.error("Error connecting to Solana blockchain:", error);
    }
})();
