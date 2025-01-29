const {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const { createSyncNativeInstruction, getAssociatedTokenAddress, NATIVE_MINT } = require("@solana/spl-token");
const dotenv = require("dotenv");

dotenv.config();

const SOLANA_RPC = process.env.SOLANA_RPC;
const PRIVATE_KEY = JSON.parse(`[${process.env.BULLX_PRIVATE_KEY}]`);

async function wrapSOL() {
    const connection = new Connection(SOLANA_RPC, "confirmed");
    const wallet = Keypair.fromSecretKey(new Uint8Array(PRIVATE_KEY));

    const associatedTokenAccount = await getAssociatedTokenAddress(
        NATIVE_MINT,
        wallet.publicKey
    );

    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: associatedTokenAccount,
            lamports: LAMPORTS_PER_SOL, // 1 SOL
        }),
        createSyncNativeInstruction(associatedTokenAccount)
    );

    await sendAndConfirmTransaction(connection, transaction, [wallet]);

    console.log("1 SOL wrapped into WSOL.");
}

wrapSOL().catch(console.error);
