import React from "react";
import { WalletType } from "../WalletType";
import { useGetCurrentWallet } from "../../../../hooks/useCurrentAccount";

export const ReceiveAmount = ({ toggleSidebar }) => {
  const wallets = useGetCurrentWallet();

  return (
    <div className="w-full p-2 h-full relative flex flex-col justify-between items-center">
      <div className="w-full space-y-2 flex-1">
        {wallets.map(({ type, publicKey }) => {
          console.log({ type, publicKey });
          return (
            <WalletType type={type} publicKey={publicKey} showDollar={false} />
          );
        })}
      </div>
      <button
        onClick={toggleSidebar}
        className="w-[90%] bg-[#333333] rounded-lg px-4 py-3 mb-4"
      >
        <span className="">Close</span>
      </button>
    </div>
  );
};
