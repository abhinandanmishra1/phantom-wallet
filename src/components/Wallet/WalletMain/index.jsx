import React, { useMemo } from "react";

import WalletDashboard from "./WalletDashboard";
import { WalletType } from "./WalletType";
import { useWalletContext } from "../../../context";

export const WalletMain = () => {
  const {
    currentAccount,
    wallet: {
      accounts,
    },
  } = useWalletContext();

  const wallets = useMemo(() => {
    if (!accounts || !accounts[currentAccount]) return [];

    return accounts[currentAccount].wallets;
  }, [currentAccount, accounts]);

  return (
    <div className="flex-1 flex flex-col gap-2">
      <WalletDashboard />
      <div className="p-4 flex flex-col gap-2">
        {wallets.map((wallet, index) => {
          return <WalletType key={wallet.type+index} type={wallet.type} />;
        })}
      </div>
    </div>
  );
};
