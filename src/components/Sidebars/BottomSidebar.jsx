import { IoIosArrowRoundBack, IoIosSettings } from "react-icons/io";
import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAccount } from "../../utils";
import { useWalletContext } from "../../context";

export const BottomSidebar = ({ open, toggleSidebar }) => {
  const {
    wallet: { accounts, mnemonic },
    setCurrentAccount,
  } = useWalletContext();

  const { createMultipleAccounts } = useAccount();

  const accountNumber = accounts.length;
  const [nextPage, setNextPage] = useState(false);
  const [name, setName] = useState(`Account ${accountNumber + 1}`);

  const toggleNextPage = () => {
    setNextPage((open) => !open);
  };

  const createWallet = () => {
    createMultipleAccounts({
      wallets: ["SOLANA", "ETHEREUM"],
      mnemonic,
      accountNumber,
      name,
    });

    setCurrentAccount(accountNumber);
    toggleNextPage();
    toggleSidebar();
  };

  return (
    <>
      <div
        className={`bottom-0 h-full left-0 rounded-lg bg-[#222222] duration-500 w-full ${
          open ? "translate-y-0" : "translate-y-full -z-0"
        } absolute z-20 text-white flex flex-col gap-2 items-center px-2`}
      >
        <div className="h-14 text-white flex justify-between p-2 items-center text-sm border-b border-b-[#333] w-full">
          <RxCross1
            onClick={toggleSidebar}
            size={16}
            className="text-gray-500 font-bold cursor-pointer"
          />
          <h1 className="text-lg">Add New Wallet</h1>
          <div></div>
        </div>

        <button className="p-2 w-full" onClick={toggleNextPage}>
          <div className="flex gap-3 items-center cursor-pointer w-full bg-[#2a2a2a] hover:bg-[#303030] p-2 py-4 rounded-lg">
            <div className="w-8 h-8 grid place-items-center rounded-[50%] bg-[#ffffff1a] p-1">
              <FaPlus size={10} />
            </div>

            <div>
              <p>Create New Account</p>
              <p className="text-sm text-gray-500">
                Add a new multi-chain account
              </p>
            </div>
          </div>
        </button>
      </div>

      <div
        className={`bottom-0 h-full left-0 rounded-lg bg-[#222222] duration-500 w-full z-30 ${
          nextPage ? "translate-x-0" : "translate-x-full"
        } absolute z-20 text-white flex flex-col gap-2 items-center px-2`}
      >
        <div className="h-14 text-white flex justify-between p-2 items-center text-sm border-b border-b-[#333] w-full">
          <IoIosArrowRoundBack
            onClick={toggleNextPage}
            size={32}
            className="text-gray-500 font-bold cursor-pointer"
          />
          <h1 className="text-lg">Create Account</h1>
          <div></div>
        </div>

        <div className="flex flex-col justify-between w-full p-2 pb-4 grow">
          <div className="flex flex-col gap-4 p-8 items-center w-full">
            <div className="w-24 h-24 text-3xl rounded-[50%] bg-[#333333] grid place-items-center">
              {name[0]}
              {accountNumber + 1}
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
              onClick={toggleNextPage}
              className="w-[50%] bg-[#333333] rounded-lg hover: px-4 py-3"
            >
              <span className="">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
