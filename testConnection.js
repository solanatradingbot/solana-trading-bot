const { Connection, clusterApiUrl } = require('@solana/web3.js');

// Choose a cluster (mainnet, devnet, or testnet)
const cluster = clusterApiUrl('devnet');

const connection = new Connection(cluster, 'confirmed');

const checkConnection = async () => {
    try {
        const version = await connection.getVersion();
        console.log('Connection to Solana cluster successful:', version);
    } catch (error) {
        console.error('Failed to connect to Solana:', error);
    }
};

checkConnection();
