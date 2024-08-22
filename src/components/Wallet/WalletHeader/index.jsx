import React, { useState } from "react";

import { AccounDetails } from "../../../blocks/AccountDetails";
import { BiCopy } from "react-icons/bi";
import { useWalletContext } from "../../../context";

export const WalletHeader = ({ open, toggleSidebar }) => {
  const {
    wallet: { accounts },
    currentAccount,
  } = useWalletContext();
  const { name } = accounts[currentAccount];

  return (
    <>
      <div className="h-14 text-white flex justify-between items-center p-4 text-sm border-b border-b-[#333] relative">
        <div className="flex gap-2 items-center">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 grid place-items-center rounded-[50%] bg-[#333] p-1 text-xs"
          >
            {name[0]}
            {currentAccount + 1}
          </button>
          <AccounDetails accountNumber={currentAccount} place="bottom-start">
            <div className="flex gap-2 items-center cursor-pointer group">
              <p>{name}</p>
              <BiCopy className="text-[#606060] group-hover:text-white" />
            </div>
          </AccounDetails>
        </div>
        <div></div>
      </div>
    </>
  );
};
