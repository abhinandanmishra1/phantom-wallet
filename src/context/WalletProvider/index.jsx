import { createContext, useContext, useEffect, useState } from "react";

import React from "react";

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(0); // 0 means first account
  const [wallet, setWallet] = useState({
    mnemonic: "",
    accounts: [],
  });

  useEffect(() => {
    const mnemonic = localStorage.getItem("mnemonic");
    if (mnemonic) {
      setWallet((wallet) => ({
        ...wallet,
        mnemonic,
      }));
    }

    const accounts = localStorage.getItem("accounts");
    if (accounts) {
      setWallet((wallet) => ({
        ...wallet,
        accounts: JSON.parse(accounts || "[]") ?? [],
      }));
    }
  }, []);

  const updateWallet = (wallet) => {
    setWallet((currWallet) => ({ ...currWallet, ...wallet }));

    if (wallet.mnemonic) {
      localStorage.setItem("mnemonic", wallet.mnemonic);
    }

    if (wallet.seed) {
      localStorage.setItem("seed", wallet.seed);
    }

    if (wallet.accounts) {
      localStorage.setItem("accounts", JSON.stringify(wallet.accounts));
    }
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        updateWallet,
        currentAccount,
        setCurrentAccount
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  if (!WalletContext)
    throw new Error(
      "Wallet Context can be used only inside the provider of wallet context"
    );

  return useContext(WalletContext);
};
