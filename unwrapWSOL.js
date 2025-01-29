const {
  Connection,
  Keypair,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");
const bs58 = require("bs58");

const connection = new Connection(process.env.SOLANA_RPC, "confirmed");
const privateKey = bs58.decode(process.env.BULLX_PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(privateKey);

(async () => {
  try {
    console.log(
      "Wallet Balance Before:",
      await connection.getBalance(wallet.publicKey) / 1e9,
      "SOL"
    );

    // Create a transaction to unwrap WSOL
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey,
        lamports: 0, // A zero lamport transfer to self unwraps WSOL
      })
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

    transaction.sign(wallet);
    const txId = await connection.sendTransaction(transaction, {
      skipPreflight: false,
    });
    console.log(`Transaction successful: https://solscan.io/tx/${txId}`);

    console.log(
      "Wallet Balance After:",
      await connection.getBalance(wallet.publicKey) / 1e9,
      "SOL"
    );
  } catch (error) {
    console.error("Error unwrapping WSOL:", error.message);
  }
})();
