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

      const secretKeyArray = bs58.decode(privateKey);
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

  async getAllTransactionsByPublicKey(publicKey) {
    // const publicKey = new PublicKey(publicKeyBase58);

    const signatureInfos = await this.connection.getSignaturesForAddress(
      publicKey,
      {
        limit: 1000,
      }
    );

    let signatureList = signatureInfos.map(info=>info.signature);
    let transactionDetails = await this.connection.getParsedTransactions(signatureList, {maxSupportedTransactionVersion:0});

    const transactions = signatureInfos.map((info, i) => {
      const date = new Date(info.blockTime * 1000);
      
      return {
        signature: info.signature,
        date,
        confirmationStatus: info.confirmationStatus,
        transactionInstructions: transactionDetails[i].transaction.message.instructions
      };
    });

    return transactions;
  }

  async getTransactionDetails(signature) {
    const transaction = await this.connection.getParsedConfirmedTransaction(
      signature
    );
    return transaction;
  }
}
