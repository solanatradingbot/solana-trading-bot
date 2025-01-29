const fetch = require("cross-fetch");

(async () => {
  try {
    // Jupiter API endpoint for quotes
    const quoteEndpoint = "https://quote-api.jup.ag/v6/quote";
    const swapEndpoint = "https://quote-api.jup.ag/v6/swap";

    // Token mint addresses for the trade
    const inputMint = "So11111111111111111111111111111111111111112"; // WSOL
    const outputMint = "4k3Dyjzvzp8eM6z3hwhbQTFrZL5iYzzT18rCzQ4iQABF"; // Example Token (Replace with desired token)

    // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    const amount = 100000000; // 0.1 SOL

    // Fetch quote for the trade
    const quoteResponse = await fetch(
      `${quoteEndpoint}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
    );
    const quoteData = await quoteResponse.json();

    if (quoteData && quoteData.data) {
      const bestRoute = quoteData.data[0];
      console.log(`Best Route: ${JSON.stringify(bestRoute)}`);

      // Execute trade using the best route
      const swapResponse = await fetch(swapEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteResponse: bestRoute,
          userPublicKey: "3TQKQGNjGcoJdWoaP91TdvoS6jVS3MS5uYftfzoA8C6e", // Replace with your wallet
        }),
      });

      const swapData = await swapResponse.json();
      console.log("Swap Transaction:", swapData);
    } else {
      console.error("No route available for the trade.");
    }
  } catch (error) {
    console.error("Error executing trade:", error);
  }
})();
