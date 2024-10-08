import { useMemo } from "react";
import { useWalletContext } from "../context";

export const useCurrentAccount = () => {
  const {
    currentAccount,
    wallet: { accounts },
  } = useWalletContext();

  const account = useMemo(() => {
    if (!accounts || !accounts[currentAccount]) return {};

    const currentAcc = accounts[currentAccount];

    const accountObj = {
      name: currentAcc.name,
      SOLANA: {},
      ETHEREUM: {},
    };

    return currentAcc.wallets.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.type]: {
          publicKey: curr.publicKey,
          privateKey: curr.privateKey,
        },
      };
    }, accountObj);
  }, [accounts, currentAccount]);

  return account;
};

export const useGetCurrentWallet = () => {
  const {
    currentAccount,
    wallet: { accounts },
  } = useWalletContext();

  return accounts[currentAccount].wallets;
};
