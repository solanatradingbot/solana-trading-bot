const { Connection, PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID, AccountLayout } = require('@solana/spl-token');
const fs = require('fs');
require('dotenv').config();

const QUICKNODE_RPC = process.env.SOLANA_RPC || 'https://lingering-spring-reel.solana-mainnet.quiknode.pro/54d3be0593edda91ced37946a5a0c6aa51242d22';
const WALLET_ADDRESS = process.env.BULLX_WALLET_ADDRESS || 'DLhW3QrmYjqaypi3MokujK5FFzu5Fwj73L6ZVcggH3sE';

const connection = new Connection(QUICKNODE_RPC);

(async () => {
    try {
        const walletPublicKey = new PublicKey(WALLET_ADDRESS);
        const accounts = await connection.getTokenAccountsByOwner(walletPublicKey, {
            programId: TOKEN_PROGRAM_ID,
        });

        console.log(`Found ${accounts.value.length} token account(s) for wallet: ${WALLET_ADDRESS}\n`);
        accounts.value.forEach((accountInfo, index) => {
            const accountData = AccountLayout.decode(accountInfo.account.data);
            console.log(`Token Account ${index + 1}:`);
            console.log(`Mint: ${new PublicKey(accountData.mint)}`);
            console.log(`Amount: ${accountData.amount.toString()}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Error fetching token balances:', error);
    }
})();
