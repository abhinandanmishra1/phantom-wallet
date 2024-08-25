import EthereumIcon from "./assets/ethereum.avif";
import SolanaIcon from "./assets/solana.avif";

export const STEPS = {
  HOME: "HOME",
  PASSWORD: "PASSWORD",
  SECRET_RECOVERY_PHRASE: "SECRET_RECOVERY_PHRASE",
  COMPLETED: "COMPLETED",
};

export const WALLET_TYPES = {
  SOLANA: "SOLANA",
  ETHEREUM: "ETHEREUM",
}

export const BLOCKCHAIN_TO_PATH = {
  SOLANA: "501",
  ETHEREUM: "60",
};

export const PAGE_TYPES = {
  NONE: "NONE",
  CREATE_WALLET: "CREATE_WALLET",
  IMPORT_PRIVATE_KEY: "IMPORT_PRIVATE_KEY",
  SEND_AMOUNT_PAGE: "SEND_AMOUNT_PAGE"
};

export const SIDEBAR_TYPES = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  BOTTOM: "BOTTOM",
  TOP: "TOP",
  NONE: "NONE",
};

export const PAGE_TITLE = {
  
}

export const CURRENCY = {
  SOLANA: "SOL",
  ETHEREUM: "ETH",
};

export const Images = {
  SOLANA: SolanaIcon,
  ETHEREUM: EthereumIcon,
};