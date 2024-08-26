import { useMemo } from "react";
import { useWalletContext } from "../../../../context";

export const useGetAccountsWithType = (type) => {
  const {
    currentAccount,
    wallet: { accounts },
  } = useWalletContext();

  return useMemo(() => {
    if (!accounts) return [];

    return accounts
      .filter((_, accountNumber) => accountNumber != currentAccount)
      .reduce((wallets, account) => {
        const wallet = account.wallets.find((wallet) => wallet.type === type);

        if (!wallet) return wallets;

        return [
          ...wallets,
          {
            name: account.name,
            publicKey: wallet.publicKey,
          },
        ];
      }, []);
  }, [accounts, currentAccount]);
};
