import React, { useMemo } from "react";

import WalletDashboard from "./WalletDashboard";
import { WalletType } from "./WalletType";
import { useGetCurrentWallet } from "../../../hooks/useCurrentAccount";
import { useWalletContext } from "../../../context";

export const WalletMain = () => {
  const wallets = useGetCurrentWallet();

  return (
    <div className="flex-1 flex flex-col gap-2">
      <WalletDashboard />
      <div className="p-4 flex flex-col gap-2">
        {wallets.map(({type, publicKey}, index) => {
          return <WalletType balanceInCurrency={true} key={publicKey} type={type} publicKey={publicKey} />;
        })}
      </div>
    </div>
  );
};
