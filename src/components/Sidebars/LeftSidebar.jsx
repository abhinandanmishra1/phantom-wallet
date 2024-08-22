import { IoIosArrowRoundBack, IoIosSettings } from "react-icons/io";

import { AccounDetails } from "../../blocks/AccountDetails";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import React from "react";
import { useWalletContext } from "../../context";

export const LeftSideBar = ({ open, toggleSidebar, createAccount }) => {
  const {
    wallet: { accounts },
    setCurrentAccount,
  } = useWalletContext();

  return (
    <div
      className={`top-[1%] left-0 rounded-lg bg-black h-[98%] duration-300 w-18 ${
        open ? "translate-x-1" : "-translate-x-16 invisible -z-0"
      } absolute z-20 text-white flex flex-col gap-2 items-center py-4 px-2`}
    >
      <div className="hover:bg-white hover:text-black rounded-lg cursor-pointer p-1">
        <IoIosArrowRoundBack
          onClick={toggleSidebar}
          size={28}
          className="text-gray-500 font-bold"
        />
      </div>
      <div className="flex flex-col gap-2">
        {accounts.map(({ name }, index) => {
          return (
            <AccounDetails accountNumber={index}>
              <div
                className="flex flex-col items-center gap-[2px] group cursor-pointer"
                onClick={() => {
                  setCurrentAccount(index);
                  toggleSidebar();
                }}
              >
                <div className="group-hover:bg-[#ffffffdd] text-xs w-12 h-12 font-bold rounded-[50%] bg-[#ab9ff2] text-black grid place-items-center">
                  {name[0]}
                  {index + 1}
                </div>
                <p className="group-hover:text-[#ffffffdd] text-[10px] text-[#ab9ff2]">
                  {name}
                </p>
              </div>
            </AccounDetails>
          );
        })}
      </div>
      <div className="fixed bottom-0 text-gray-500 h-32 w-full border-t-[1px] left-0 border-[#333] flex flex-col gap-2 items-center p-2">
        <div
          className="hover:bg-white p-2 rounded-lg hover:text-black"
          onClick={createAccount}
        >
          <FaPlus size={16} className="cursor-pointer" />
        </div>
        <div className="hover:bg-white p-2 rounded-lg hover:text-black">
          <MdEdit size={16} className=" cursor-pointer" />
        </div>
        <div className="hover:bg-white p-2 rounded-lg hover:text-black">
          <IoIosSettings size={16} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
