const { Connection } = require('@solana/web3.js');

// Replace this with your QuickNode HTTP endpoint
const HTTP_ENDPOINT = 'https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22';

// Establish a connection
const connection = new Connection(HTTP_ENDPOINT, 'confirmed');

(async () => {
  try {
    const blockhash = await connection.getLatestBlockhash();
    console.log('✅ Latest Blockhash:', blockhash.blockhash);
    console.log('✅ Last Valid Block Height:', blockhash.lastValidBlockHeight);
  } catch (error) {
    console.error('❌ Error fetching latest blockhash:', error);
  }
})();
