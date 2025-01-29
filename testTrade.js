const { Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey } = require('@solana/web3.js');
const bs58 = require('bs58');

// Your wallet private key (in base58 format)
const senderPrivateKey = bs58.decode('48Djozoa6z2wTugEFr6AVoqXeoPuA8uFUbePCkZmiaRacFFqoUzpnjvva73LihP5bsRS6aoAVRjd42SiBMsvELRY');

// Create sender keypair from the private key
const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);

// Set up the Solana connection (to mainnet)
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Destination address (use your own wallet for testing if needed)
const destinationPublicKey = new PublicKey('HD6eQVQ8vfSgXoSXSN6LMwW1be9kcmmhUJVTveuB2jq4');

// Amount to send in lamports (1 SOL = 1e9 lamports)
const amount = 0.001 * 1e9; // Sending 0.001 SOL

async function sendTransaction() {
  try {
    // Create a transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: destinationPublicKey,
        lamports: amount,
      })
    );

    // Send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
    console.log('Transaction successful with signature:', signature);
  } catch (err) {
    console.error('Transaction failed:', err);
  }
}

sendTransaction();
