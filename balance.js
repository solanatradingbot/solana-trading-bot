const { Connection, PublicKey, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const QUICKNODE_RPC = 'https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const WALLET_ADDRESS = 'DLhW3QrmYjqaypi3MokujK5FFzu5Fwj73L6ZVcggH3sE'; // Your Bullx wallet address

(async () => {
    try {
        let balance = await SOLANA_CONNECTION.getBalance(new PublicKey(WALLET_ADDRESS));
        console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
})();

