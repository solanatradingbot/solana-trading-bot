const { Connection, PublicKey } = require('@solana/web3.js');

// Replace these with your QuickNode endpoints
const HTTP_ENDPOINT = 'https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22';
const WSS_ENDPOINT = 'wss://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22';

// Replace with your wallet's public key
const ACCOUNT_PUBLIC_KEY = new PublicKey('HD6eQVQ8vfSgXoSXSN6LMwW1be9kcmmhUJVTveuB2jq4');

// Establish a connection with both HTTP and WSS
const connection = new Connection(HTTP_ENDPOINT, {
  wsEndpoint: WSS_ENDPOINT,
  commitment: 'confirmed',
});

console.log('🟢 Subscribing to account:', ACCOUNT_PUBLIC_KEY.toBase58());

connection.onAccountChange(ACCOUNT_PUBLIC_KEY, (accountInfo, context) => {
  console.log('🔄 Account changed:', accountInfo);
  console.log('�� Context:', context);
});
