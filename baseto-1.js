const bs58 = require('bs58'); // Install this library if not already installed
const { Keypair, Connection, clusterApiUrl } = require('@solana/web3.js');

const senderPrivateKeyBase58 = "2XTDFTRDvEmeg3dBz3TbA6df5BJraaah1ocRKySUb3rS3Uu9rbcWGC6V61Cow8qgWKAXY32NbwgPmk5i9syYd6Xi"; // Your key
const senderPrivateKey = bs58.decode(senderPrivateKeyBase58);
const sender = Keypair.fromSecretKey(senderPrivateKey);

console.log("Sender's Public Key:", sender.publicKey.toBase58());

// Test connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function testTrade() {
    const balance = await connection.getBalance(sender.publicKey);
    console.log(`Sender's SOL Balance: ${balance / 1e9} SOL`);
}

testTrade().catch(console.error);
