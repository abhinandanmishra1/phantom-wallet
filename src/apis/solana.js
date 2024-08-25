import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import axios from "axios";
import bs58 from "bs58";

const RPC_URL = import.meta.env.VITE_SOLANA_BLOCKCHAIN_URL;

export class SolanaConnection {
  constructor(publicKey, privateKey) {
    this.url = RPC_URL;
    this.connection = new Connection(this.url, "confirmed");

    if (publicKey && privateKey) {
      this.publicKey = new PublicKey(publicKey);

      // Decode the private key string into a Uint8Array
      const secretKeyArray = bs58.decode(privateKey);

      console.log(secretKeyArray);

      // Create a Keypair from the decoded secret key
      this.keypair = Keypair.fromSecretKey(secretKeyArray);
    }
  }

  async transferSol(receiverPublicKey, sols) {
    const lamports = sols * LAMPORTS_PER_SOL;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: this.publicKey,
        toPubkey: receiverPublicKey,
        lamports,
      })
    );

    await sendAndConfirmTransaction(this.connection, transaction, [
      this.keypair,
    ]);
  }

  async getBalance(publicKeyBase58) {
    const payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "getBalance",
      params: [publicKeyBase58],
    };

    const { data } = await axios.post(this.url, payload);
    return data;
  }
}
