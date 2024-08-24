import React, { useState } from "react";

import { useAccount } from "../../../utils";
import { useNavigateToPages } from "../../../hooks";
import { useWalletContext } from "../../../context";

export const ImportPrivateKeyPage = () => {
  const {
    wallet: { accounts, mnemonic },
    setCurrentAccount,
  } = useWalletContext();

  const { navigateToNone } = useNavigateToPages();

  const { createMultipleAccounts } = useAccount();

  const accountNumber = accounts.length;

  const [name, setName] = useState(`Account ${accountNumber + 1}`);
  const [privateKey, setPrivateKey] = useState(null);

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
    <div className="flex flex-col justify-between w-full grow">
      <div className="flex flex-col gap-4 p-10 pb-14 items-center w-full">
        <div className="w-24 h-24 text-3xl rounded-[50%] bg-[#333333] grid place-items-center">
          {name
            .split(" ")
            .map((str) => str.charAt(0))
            .join("")}
        </div>

        <input
          type="text"
          placeholder="Name"
          className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="Paste your private key here"
          className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500 resize-none"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
        />
      </div>

      <div className="flex w-full gap-2 justify-end p-3 border-t border-t-[#333]">
        <button
          onClick={createWallet}
          className="w-full bg-[#ab9ff2] text-black rounded-lg hover: px-4 py-3"
        >
          <span className="">Import</span>
        </button>
      </div>
    </div>
  );
};
