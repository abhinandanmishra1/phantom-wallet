import { FiDollarSign, FiPlus, FiSend } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import { BottomSidebarWrapper } from "../../Sidebars";
import { MdSwapHoriz } from "react-icons/md";
import { ReceiveAmount } from "./ReceiveAmount";
import { SendAmountOptions } from "./SendAmount/SendAmountOptions";
import { convertToUsd } from "../../../utils";
import { useCurrentAccount } from "../../../hooks/useCurrentAccount";
import { useEthereumGetBalance } from "../../../hooks/ethereum";
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
  const { SOLANA, ETHEREUM } = useCurrentAccount();
  const [balanceInUSD, setBalanceInUSD] = useState(null);

  const { data: solBalance } = useSolanaGetBalance(SOLANA?.publicKey);

  const { data: ethBalance } = useEthereumGetBalance(ETHEREUM?.publicKey);

  useEffect(() => {
    convertToUsd({
      sol: solBalance || 0,
      eth: ethBalance || 0,
    }).then(({total}) => {
      setBalanceInUSD(total);
    });
  }, [ethBalance, solBalance]);

  const { navigateToSendAmountPage } = useNavigateToPages();

  const SIDEBAR_TYPES = {
    SEND_AMOUNT: "SEND_AMOUNT",
    RECIEVE_AMOUNT: "RECIEVE_AMOUNT",
    NONE: "NONE",
  };

  const [sidebarType, setSidebarTypeOpen] = useState(SIDEBAR_TYPES.NONE);

  const closeSidebar = () => {
    setSidebarTypeOpen(SIDEBAR_TYPES.NONE);
  };

  const openSendAmountSidebar = () => {
    setSidebarTypeOpen(SIDEBAR_TYPES.SEND_AMOUNT);
  };

  const openReceiveAmountSidebar = () => {
    setSidebarTypeOpen(SIDEBAR_TYPES.RECIEVE_AMOUNT);
  };

  const SEND_AMOUNT_SIDEBAR_OPEN = sidebarType === SIDEBAR_TYPES.SEND_AMOUNT;
  const RECEIVE_AMOUNT_SIDEBAR_OPEN =
    sidebarType === SIDEBAR_TYPES.RECIEVE_AMOUNT;
  const bottomSidebarOpen =
    SEND_AMOUNT_SIDEBAR_OPEN || RECEIVE_AMOUNT_SIDEBAR_OPEN;
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col items-center p-4 gap-2 mt-4">
          <div className="text-white text-4xl font-semibold">
            ${balanceInUSD?.toFixed(2) || "0.00"}
          </div>
          <div className="w-full flex justify-center gap-2 text-gray-400 items-center">
            <p>+${incrementBalance}</p>
            <p className="bg-[#343434] p-1 rounded-lg">
              +{incrementPercentage}%
            </p>
          </div>
        </div>

        <div className="flex space-x-4 p-4">
          <ActionButton
            Icon={FiPlus}
            label="Receive"
            onClick={openReceiveAmountSidebar}
          />
          <ActionButton
            Icon={FiSend}
            label="Send"
            onClick={openSendAmountSidebar}
          />
          <ActionButton Icon={MdSwapHoriz} label="Swap" />
          <ActionButton Icon={FiDollarSign} label="Buy" />
        </div>
      </div>
      <BottomSidebarWrapper
        showHeader={false}
        open={bottomSidebarOpen}
        toggleSidebar={closeSidebar}
        className="h-[90%]"
      >
        {SEND_AMOUNT_SIDEBAR_OPEN && (
          <SendAmountOptions
            toggleSidebar={closeSidebar}
            balance={balanceInUSD}
          />
        )}

        {RECEIVE_AMOUNT_SIDEBAR_OPEN && (
          <ReceiveAmount toggleSidebar={closeSidebar} />
        )}
      </BottomSidebarWrapper>
    </>
  );
};

export default WalletDashboard;
