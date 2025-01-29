const {
  Connection,
  Transaction,
  SystemProgram,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const {
  NATIVE_MINT,
  getAssociatedTokenAddress,
  createSyncNativeInstruction,
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
} = require("@solana/spl-token");

/**
* Wraps SOL into WSOL
*/
async function wrapSOL(connection, wallet, amountLamports) {
  const associatedTokenAccount = await getAssociatedTokenAddress(
      NATIVE_MINT,
      wallet.publicKey
  );

  const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedTokenAccount,
          wallet.publicKey,
          NATIVE_MINT
      ),
      SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: associatedTokenAccount,
          lamports: amountLamports,
      }),
      createSyncNativeInstruction(associatedTokenAccount)
  );

  await sendAndConfirmTransaction(connection, transaction, [wallet]);
  console.log(`✅ Wrapped ${amountLamports / LAMPORTS_PER_SOL} SOL into WSOL`);
  return associatedTokenAccount;
}

/**
* Unwraps WSOL into SOL
*/
async function unwrapSOL(connection, wallet, tokenAccount) {
  const transaction = new Transaction().add(
      createCloseAccountInstruction(
          tokenAccount,
          wallet.publicKey,
          wallet.publicKey
      )
  );

  await sendAndConfirmTransaction(connection, transaction, [wallet]);
  console.log(`✅ Unwrapped WSOL into SOL`);
}

module.exports = { wrapSOL, unwrapSOL };
