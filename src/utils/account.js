import { BLOCKCHAIN_TO_PATH } from "../constants";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { ethers } from "ethers";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { useWalletContext } from "../context";

export const createSolanaWallet = (derivedSeed) => {
  const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
  const keypair = Keypair.fromSecretKey(secretKey);

  const privateKeyEncoded = bs58.encode(secretKey);
  const publicKeyEncoded = keypair.publicKey.toBase58();

  return {
    privateKey: privateKeyEncoded,
    publicKey: publicKeyEncoded,
  };
};

export const createEthereumWallet = (derivedSeed) => {
  const privateKeyEncoded = Buffer.from(derivedSeed).toString("hex");

  const wallet = new ethers.Wallet(privateKeyEncoded);
  const publicKeyEncoded = wallet.address;

  return {
    privateKey: privateKeyEncoded,
    publicKey: publicKeyEncoded,
  };
};

const WALLETE_CREATE_FUNCTION = {
  SOLANA: createSolanaWallet,
  ETHEREUM: createEthereumWallet,
};

export const useAccount = () => {
  const { wallet, updateWallet } = useWalletContext();

  const { accounts } = wallet;

  const createAccount = ({ walletType, mnemonic, accountNumber }) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const pathType = BLOCKCHAIN_TO_PATH[walletType] || "501"; // default is SOLANA
    const path = `m/44'/${pathType}'/0'/${accountNumber}'`;
    const { key: derivedSeed } = derivePath(path, seed.toString("hex"));

    const { publicKey, privateKey } =
      WALLETE_CREATE_FUNCTION[walletType](derivedSeed);

    return {
      publicKey,
      privateKey,
    };
  };

  const createMultipleAccounts = ({
    wallets = ["SOLANA", "ETHEREUM"],
    mnemonic,
    accountNumber,
    name,
  }) => {
    accounts[accountNumber] = {
      wallets: [],
      name: name ?? `Account ${accountNumber + 1}`,
    };

    wallets.forEach((walletType, index) => {
      console.log(walletType, index);
      const { publicKey, privateKey } = createAccount({
        walletType,
        mnemonic,
        accountNumber,
      });

      accounts[accountNumber].wallets.push({
        publicKey,
        privateKey,
        type: walletType,
      });
    });

    updateWallet({ accounts });
  };

  const importAccountFromPrivateKey = ({
    privateKeyRaw,
    accountNumber,
    name
  }) => {
    accounts[accountNumber] = {
      wallets: [],
      name: name ?? `Account ${accountNumber + 1}`,
    };
    
    let privateKey;
    if (privateKeyRaw instanceof Uint8Array) {
      privateKey = Buffer.from(privateKeyRaw).toString("hex");
    } else {
      privateKey = privateKeyRaw;
    }

    let blockchainType;
    let publicKey;

    if (privateKey.length === 64) {
      // Possible Ethereum private key
      try {
        const wallet = new ethers.Wallet(privateKey);
        publicKey = wallet.address;
        blockchainType = "ETHEREUM";
      } catch (err) {
        console.log("Invalid Ethereum key");
      }
    }

    if (!publicKey && (privateKey.length === 128 || privateKey.length === 64)) {
      // Possible Solana private key
      try {
        const keypair = Keypair.fromSecretKey(
          Uint8Array.from(Buffer.from(privateKey, "hex"))
        );
        publicKey = keypair.publicKey.toBase58();
        blockchainType = "SOLANA";
      } catch (err) {
        console.log("Invalid Solana key");
      }
    }

    if (!publicKey) {
      console.log("Invalid private key or unsupported blockchain type.");
    }else {
      accounts[accountNumber].wallets.push({
        publicKey,
        privateKey,
        type: blockchainType
      })

      updateWallet({accounts})
    }

    return { publicKey, privateKey, type: blockchainType };
  };

  return {
    createAccount,
    createMultipleAccounts,
    importAccountFromPrivateKey
  };
};
