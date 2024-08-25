import { FaDownload, FaPlus } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosSettings } from "react-icons/io";
import React, { useState } from "react";

import { MdEdit } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAccount } from "../../utils";
import { useWalletContext } from "../../context";

const NEXT_PAGE_TYPES = {
  NONE: "NONE",
  CREATE_WALLET: "CREATE_WALLET",
  IMPORT_PRIVATE_KEY: "IMPORT_PRIVATE_KEY",
};

export const BottomSidebarWrapper = ({
  open,
  toggleSidebar,
  title,
  children,
  showHeader = true,
  className = ""
}) => {
  return (
    <>
      <div
        className={`bottom-0 h-full left-0 rounded-lg bg-[#222222] duration-500 w-full ${
          open ? "translate-y-0" : "translate-y-full -z-0"
        } ${className} absolute z-20 text-white flex flex-col gap-2 items-center px-2`}
      >
        {showHeader && (
          <div className="h-14 text-white flex justify-between p-2 items-center text-sm border-b border-b-[#333] w-full">
            <RxCross1
              onClick={toggleSidebar}
              size={16}
              className="text-gray-500 font-bold cursor-pointer"
            />
            <h1 className="text-lg">{title}</h1>
            <div></div>
          </div>
        )}

        {children}
      </div>
    </>
  );
};
