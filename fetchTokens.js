require('dotenv').config(); // Load environment variables from .env file
const fetch = require('node-fetch');

// Environment variable: Replace this with the Jupiter API endpoint from your QuickNode dashboard
const JUPITER_API = `${process.env.JUPITER_API}/tokens`;

async function fetchTokens() {
  try {
    console.log('🌐 Fetching tokens from Jupiter API...');
    const response = await fetch(JUPITER_API, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Tokens:', data);
  } catch (error) {
    console.error('❌ Error fetching tokens:', error);
  }
}

fetchTokens();
