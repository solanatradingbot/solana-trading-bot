const fetch = require("cross-fetch");

(async () => {
  try {
    // Jupiter API endpoint for token prices
    const endpoint = "https://quote-api.jup.ag/v4/token-price";

    // Example token address for WSOL
    const tokenMintAddress = "So11111111111111111111111111111111111111112"; // Replace with the token mint you want

    // Fetch price data
    const response = await fetch(`${endpoint}/${tokenMintAddress}`);
    const data = await response.json();

    if (data && data.price) {
      console.log(`Token Price for Mint (${tokenMintAddress}): $${data.price.toFixed(2)}`);
    } else {
      console.error("No price data found for the token.");
    }
  } catch (error) {
    console.error("Error fetching token price:", error);
  }
})();
