import { CURRENCY, PAGE_TYPES } from "../../../../constants";
import React, { useState } from "react";

import { RightSidebarWrapper } from "../../../Sidebars/RightSidebarWrapper";
import { SendAmountPage } from "./SendAmountPage";
import { WalletType } from "../WalletType";
import {
  useGetCurrentWallet,
} from "../../../../hooks/useCurrentAccount";
import { useNavigateToPages } from "../../../../hooks";
import { useSolanaGetBalance } from "../../../../hooks/solana";
import { useStore } from "../../../../store";

export const SendAmountOptions = ({ toggleSidebar, balance }) => {
  const wallets = useGetCurrentWallet();
  const {selectedWallet} = useStore(state => state);
  const { navigateToSendAmountPage, page, navigateToNone } =
    useNavigateToPages();

  const closeSidebars = () => {
    navigateToNone();
    toggleSidebar();
  };

  const SEND_AMOUNT_PAGE_OPEN = page === PAGE_TYPES.SEND_AMOUNT_PAGE;

  return (
    <div className="w-full p-2 h-full relative flex flex-col justify-between items-center">
      <div className="w-full space-y-2 flex-1">
        {wallets.map((wallet) => {
          return (
            <WalletType
              key={wallet.publicKey}
              onClick={() => {
                navigateToSendAmountPage(wallet.type, wallet.publicKey);
              }}
              type={wallet.type}
              showDollar={false}
            />
          );
        })}
      </div>
      <button
        onClick={toggleSidebar}
        className="w-[90%] bg-[#333333] rounded-lg px-4 py-3 mb-4"
      >
        <span className="">Close</span>
      </button>

      <RightSidebarWrapper
        title={`Send ${CURRENCY[selectedWallet?.type]}`}
        open={SEND_AMOUNT_PAGE_OPEN}
        toggleSidebar={navigateToNone}
      >
        {SEND_AMOUNT_PAGE_OPEN && (
          <SendAmountPage wallet={selectedWallet} toggleSidebar={closeSidebars} />
        )}
      </RightSidebarWrapper>
    </div>
  );
};
