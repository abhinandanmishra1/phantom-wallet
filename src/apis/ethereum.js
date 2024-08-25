import { ethers } from "ethers";

const RPC_URL = import.meta.env.VITE_ETHEREUM_BLOCKCHAIN_URL;

export class EthereumConnection {
  constructor(publicKey, privateKey) {
    this.url = RPC_URL;
    this.provider = new ethers.providers.JsonRpcProvider(this.url);

    if (publicKey && privateKey) {
      this.publicKey = publicKey;
      this.wallet = new ethers.Wallet(privateKey, this.provider);
    }
  }

  async transferEth(receiverPublicKey, ethAmount) {
    const transaction = {
      to: receiverPublicKey,
      value: ethers.utils.parseEther(ethAmount.toString()),
    };

    const txResponse = await this.wallet.sendTransaction(transaction);
    await txResponse.wait();
  }

  async getBalance(publicKey) {
    const balance = await this.provider.getBalance(publicKey);
    return ethers.utils.formatEther(balance);
  }

  async getAllTransactionsByPublicKey(publicKey) {
    const history = await this.provider.getHistory(publicKey);

    const transactions = history.map((tx) => {
      return {
        hash: tx.hash,
        blockNumber: tx.blockNumber,
        timestamp: new Date(tx.timestamp * 1000),
        from: tx.from,
        to: tx.to,
        value: ethers.utils.formatEther(tx.value),
        gasPrice: ethers.utils.formatEther(tx.gasPrice),
        gasUsed: tx.gasUsed.toString(),
      };
    });

    return transactions;
  }

  async getTransactionDetails(transactionHash) {
    const transaction = await this.provider.getTransaction(transactionHash);
    const receipt = await this.provider.getTransactionReceipt(transactionHash);
    
    return {
      transaction,
      receipt,
    };
  }
}
