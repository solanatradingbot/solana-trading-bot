NodeJS.Require("dotenv").config();
const fetch = require("node-fetch");

// Ensure environment variables are loaded
const {
  JUPITER_API,
  INPUT_TOKEN_MINT,
  OUTPUT_TOKEN_MINT,
  TRADE_AMOUNT,
  TRADE_SLIPPAGE
} = process.env;

if (!JUPITER_API || !INPUT_TOKEN_MINT || !OUTPUT_TOKEN_MINT || !TRADE_AMOUNT || !TRADE_SLIPPAGE) {
  console.error("Missing required environment variables. Please check your .env file.");
  process.exit(1);
}

(async () => {
  try {
    // Construct the Jupiter API URL for fetching a quote
    const url = `${JUPITER_API}/quote?inputMint=${INPUT_TOKEN_MINT}&outputMint=${OUTPUT_TOKEN_MINT}&amount=${TRADE_AMOUNT}&slippage=${TRADE_SLIPPAGE}`;
    console.log(`Fetching trade route from Jupiter: ${url}`);

    // Fetch the quote from Jupiter API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    // Check for HTTP errors
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the JSON response
    const quote = await response.json();

    // Check if a valid quote is returned
    if (!quote || !quote.routes || quote.routes.length === 0) {
      console.error("No valid trade routes found. Please verify your input/output mints and amount.");
      return;
    }

    // Display the best trade route
    console.log("Best Trade Route:", JSON.stringify(quote.routes[0], null, 2));
  } catch (error) {
    console.error("Error fetching trade route:", error);
  }
})();
