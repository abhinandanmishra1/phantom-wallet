import { IoIosArrowRoundBack } from "react-icons/io";
import React from "react";

export const RightSidebarWrapper = ({title, open, toggleSidebar, children}) => {
  return (
    <div
      className={`bottom-0 h-full left-0 rounded-lg bg-[#222222] duration-500 w-full z-30 ${
        open ? "translate-x-0"
          : "translate-x-full"
      } absolute z-20 text-white flex flex-col gap-2 items-center px-2`}
    >
      <div className="h-14 text-white flex justify-between p-2 items-center text-sm border-b border-b-[#333] w-full">
        <IoIosArrowRoundBack
          onClick={toggleSidebar}
          size={32}
          className="text-gray-500 font-bold cursor-pointer"
        />
        <h1 className="text-lg">
            {title}
        </h1>
        <div></div>
      </div>

      {children}
    </div>
  );
};
