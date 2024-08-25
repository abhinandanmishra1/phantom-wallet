import { FiDollarSign, FiPlus, FiSend } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import { BottomSidebarWrapper } from "../../Sidebars";
import { MdSwapHoriz } from "react-icons/md";
import { SendAmountOptions } from "./SendAmount/SendAmountOptions";
import { useCurrentAccount } from "../../../hooks/useCurrentAccount";
import { useNavigateToPages } from "../../../hooks";
import { useSolanaGetBalance } from "../../../hooks/solana";

const ActionButton = ({ Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center p-2 py-3 justify-center rounded-xl bg-[#2a2a2a] hover:bg-[#333] flex-col gap-1 w-32"
  >
    <div>
      <Icon className="text-[#ab9ff2]" size={26} />
    </div>
    <span className="text-[#888] text-sm">{label}</span>
  </button>
);

const WalletDashboard = ({
  incrementPercentage = "0.00",
  incrementBalance = "0.00",
}) => {
  const {
    SOLANA: { publicKey },
  } = useCurrentAccount();
  // const publicKey = "AJpPHpD6Gfh7jRcgLp6hhpyt7YwmC29HGbg2xkFikZPd"
  const { data: balance } = useSolanaGetBalance(publicKey);

  const {navigateToSendAmountPage} = useNavigateToPages();

  const [bottomSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center p-4 gap-2 mt-4">
          <div className="text-white text-4xl font-semibold">
            ${balance?.toFixed(2) || "0.00"}
          </div>
          <div className="w-full flex justify-center gap-2 text-gray-400 items-center">
            <p>+${incrementBalance}</p>
            <p className="bg-[#343434] p-1 rounded-lg">
              +{incrementPercentage}%
            </p>
          </div>
        </div>

        <div className="flex space-x-4 p-4">
          <ActionButton Icon={FiPlus} label="Receive" />
          <ActionButton Icon={FiSend} label="Send" onClick={toggleSidebar} />
          <ActionButton Icon={MdSwapHoriz} label="Swap" />
          <ActionButton Icon={FiDollarSign} label="Buy" />
        </div>
      </div>
      <BottomSidebarWrapper
        showHeader={false}
        open={bottomSidebarOpen}
        toggleSidebar={toggleSidebar}
        className="h-[90%]"
      >
        <SendAmountOptions toggleSidebar={toggleSidebar} balance={balance} />
      </BottomSidebarWrapper>
    </>
  );
};

export default WalletDashboard;
