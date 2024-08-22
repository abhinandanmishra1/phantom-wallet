import { BottomSidebar, LeftSideBar } from "../Sidebars";
import { IoIosArrowRoundBack, IoIosSettings } from "react-icons/io";
import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { WalletHeader } from "./WalletHeader";
import { WalletMain } from "./WalletMain";
import { WallletNavigation } from "./WalletNavigation";
import { useWalletContext } from "../../context";

export const Wallet = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottonSidebarOpen, setBottomSidebarOpen] = useState(false);

  const [activePage, setActivePage] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  const toggleBottomSidebar = () => {
    setSidebarOpen(false);
    setBottomSidebarOpen((open) => !open);
  };
  return (
    <>
      <div
        className={`h-full flex flex-col relative ${
          sidebarOpen ? "blur-sm pointer-events-none" : "blur-0"
        }`}

        onClick={() => {
          if(sidebarOpen) {
            toggleSidebar();
          }
        }}
      >
        <WalletHeader open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <WalletMain page={activePage} />
        <WallletNavigation active={activePage} navigate={setActivePage} />
      </div>

      <LeftSideBar open={sidebarOpen} toggleSidebar={toggleSidebar} createAccount={toggleBottomSidebar} />
      <BottomSidebar open={bottonSidebarOpen} toggleSidebar={toggleBottomSidebar} />
    </>
  );
};
