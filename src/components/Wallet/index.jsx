import React, { useState } from "react";

import { AddWallet } from "./AddNewWallet";
import { BottomSidebarWrapper } from "../Sidebars";
import { LeftSideBar } from "../Sidebars";
import { WalletHeader } from "./WalletHeader";
import { WalletMain } from "./WalletMain";
import { WallletNavigation } from "./WalletNavigation";
import { useStore } from "../../store";

export const Wallet = () => {
  const {
    mainSidebarOpen,
    toggleMainSidebar,
    bottomSidebarOpen,
    toggleBottomSidebar,
  } = useStore((state) => state);

  const [activePage, setActivePage] = useState("dashboard");
  
  return (
    <>
      <div
        className={`h-full flex flex-col relative ${
          mainSidebarOpen ? "blur-sm pointer-events-none" : "blur-0"
        }`}
        onClick={() => {
          if (mainSidebarOpen) {
            toggleMainSidebar();
          }
        }}
      >
        <WalletHeader
          open={mainSidebarOpen}
          toggleSidebar={toggleMainSidebar}
        />
        <WalletMain page={activePage} />
        <WallletNavigation active={activePage} navigate={setActivePage} />
      </div>

      <LeftSideBar
        open={mainSidebarOpen}
        toggleSidebar={toggleMainSidebar}
        createAccount={toggleBottomSidebar}
      />
      <BottomSidebarWrapper
        open={bottomSidebarOpen}
        toggleSidebar={toggleBottomSidebar}
        title="Add New Wallet"
      >
        <AddWallet toggleSidebar={toggleBottomSidebar} />
      </BottomSidebarWrapper>
    </>
  );
};
