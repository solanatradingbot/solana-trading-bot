const fetch = require("node-fetch");

const JUPITER_API = "https://quote-api.jup.ag/v4/quote";
const inputMint = "So11111111111111111111111111111111111111112"; // WSOL
const outputMint = "So11111111111111111111111111111111111111112"; // WSOL (use WSOL for unwrapping)
const amount = 10000000; // Amount in lamports (1 WSOL = 1,000,000 lamports)
const slippage = 1; // 1% slippage tolerance

(async () => {
  const url = `${JUPITER_API}?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippage=${slippage}`;
  console.log(`Fetching trade route from Jupiter: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Trade Route Data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error fetching trade route:', error.message);
  }
})();
