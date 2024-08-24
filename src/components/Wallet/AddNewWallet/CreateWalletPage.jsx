import React, { useState } from "react";

import { useAccount } from "../../../utils";
import { useNavigateToPages } from "../../../hooks";
import { useWalletContext } from "../../../context";

export const CreateWalletPage = () => {
  const {
    wallet: { accounts, mnemonic },
    setCurrentAccount,
  } = useWalletContext();

  const { navigateToNone } = useNavigateToPages();

  const { createMultipleAccounts } = useAccount();

  const accountNumber = accounts.length;

  const [name, setName] = useState(`Account ${accountNumber + 1}`);

  const createWallet = () => {
    createMultipleAccounts({
      wallets: ["SOLANA", "ETHEREUM"],
      mnemonic,
      accountNumber,
      name,
    });

    setCurrentAccount(accountNumber);
    navigateToNone();
    toggleSidebar();
  };


  return (
    <div className="flex flex-col justify-between w-full p-2 pb-4 grow">
      <div className="flex flex-col gap-4 p-8 items-center w-full">
        <div className="w-24 h-24 text-3xl rounded-[50%] bg-[#333333] grid place-items-center">
          {name
            .split(" ")
            .map((str) => str.charAt(0))
            .join("")}
        </div>

        <input
          type="text"
          className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-row-reverse w-full gap-2 justify-end">
        <button
          onClick={createWallet}
          className="w-[50%] bg-[#ab9ff2] text-black rounded-lg hover: px-4 py-3"
        >
          <span className="">Create</span>
        </button>
        <button
          onClick={navigateToNone}
          className="w-[50%] bg-[#333333] rounded-lg hover: px-4 py-3"
        >
          <span className="">Cancel</span>
        </button>
      </div>
    </div>
  );
};
