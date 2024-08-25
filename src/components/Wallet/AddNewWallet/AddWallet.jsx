import { FaDownload, FaPlus } from "react-icons/fa";
import React, { useState } from "react";

import { CreateWalletPage } from "./CreateWalletPage";
import { ImportPrivateKeyPage } from "./ImportPrivateKey";
import { PAGE_TYPES } from "../../../constants";
import { RightSidebarWrapper } from "../../Sidebars/RightSidebarWrapper";
import { useNavigateToPages } from "../../../hooks";

const AddWalletButton = ({ onClick, buttonTitle, buttonSubtitle, Icon }) => {
  return (
    <button className="px-2 w-full" onClick={onClick}>
      <div className="flex gap-3 items-center cursor-pointer w-full bg-[#2a2a2a] hover:bg-[#303030] p-2 py-4 rounded-lg">
        <div className="w-8 h-8 grid place-items-center rounded-[50%] bg-[#ffffff1a] p-1">
          <Icon size={10} />
        </div>

        <div className="flex flex-col pl-1 gap-0.5">
          <p className="text-start">{buttonTitle}</p>
          <p className="text-sm text-gray-500">{buttonSubtitle}</p>
        </div>
      </div>
    </button>
  );
};

export const AddWallet = () => {
  const {
    page,
    navigateToCreateWalletPage,
    navigateToImportPrivateKeyPage,
    navigateToNone,
  } = useNavigateToPages();

  const CREATE_WALLET_PAGE_OPEN = page === PAGE_TYPES.CREATE_WALLET;
  const IMPORT_PRIVATE_KEY_PAGE_OPEN = page === PAGE_TYPES.IMPORT_PRIVATE_KEY;

  const RightSideBarOpen =
    CREATE_WALLET_PAGE_OPEN || IMPORT_PRIVATE_KEY_PAGE_OPEN;

  return (
    <>
      <AddWalletButton
        buttonTitle="Create New Account"
        buttonSubtitle="Add a new multi-chain account"
        onClick={navigateToCreateWalletPage}
        Icon={FaPlus}
      />

      <AddWalletButton
        buttonTitle="Import Private Key"
        buttonSubtitle="Import a Solana Private key"
        onClick={navigateToImportPrivateKeyPage}
        Icon={FaDownload}
      />

      <RightSidebarWrapper
        open={RightSideBarOpen}
        toggleSidebar={navigateToNone}
        title="Create Account"
      >
        {CREATE_WALLET_PAGE_OPEN && <CreateWalletPage />}
        {IMPORT_PRIVATE_KEY_PAGE_OPEN && <ImportPrivateKeyPage />}
      </RightSidebarWrapper>
    </>
  );
};
