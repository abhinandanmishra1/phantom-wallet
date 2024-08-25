import React, { useState } from "react";

import { PAGE_TYPES } from "../../../../constants";
import { RightSidebarWrapper } from "../../../Sidebars/RightSidebarWrapper";
import { SendAmountPage } from "./SendAmountPage";
import { WalletType } from "../WalletType";
import { useCurrentAccount } from "../../../../hooks/useCurrentAccount";
import { useNavigateToPages } from "../../../../hooks";
import { useSolanaGetBalance } from "../../../../hooks/solana";

export const SendAmountOptions = ({ toggleSidebar, balance }) => {
  const { navigateToSendAmountPage, page, navigateToNone } =
    useNavigateToPages();

  const toggleRightSidebar = () => {
    setRightSidebarOpen((open) => !open);
  };

  const SEND_AMOUNT_PAGE_OPEN = page === PAGE_TYPES.SEND_AMOUNT_PAGE;

  return (
    <div className="w-full p-2 h-full relative flex flex-col justify-between items-center">
      <div className="w-full space-y-2 flex-1">
        <WalletType
          onClick={navigateToSendAmountPage}
          type="SOLANA"
          balanceInCurrency={balance}
          showDollar={false}
        />
        <WalletType
          type="ETHEREUM"
          balanceInCurrency={balance}
          showDollar={false}
        />
      </div>
      <button
        onClick={toggleSidebar}
        className="w-[90%] bg-[#333333] rounded-lg px-4 py-3 mb-4"
      >
        <span className="">Close</span>
      </button>

      <RightSidebarWrapper
        title="Send SOL"
        open={SEND_AMOUNT_PAGE_OPEN}
        toggleSidebar={navigateToNone}
      >
        {SEND_AMOUNT_PAGE_OPEN && (
          <SendAmountPage toggleSidebar={toggleRightSidebar} />
        )}
      </RightSidebarWrapper>
    </div>
  );
};
