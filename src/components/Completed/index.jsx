import CompletedImg from "../../assets/finished.png";
import React from "react";
import { useAccount } from "../../utils";
import { useWalletContext } from "../../context";

export const Completed = () => {
  const {wallet: {
    mnemonic
  }} = useWalletContext();

  const {createMultipleAccounts} = useAccount();
  
  const createAccount = () => {
    createMultipleAccounts({
      wallets: ["SOLANA", "ETHEREUM"],
      mnemonic,
      accountNumber: 0
    });
  }
  
  return (
    <div className="flex flex-col w-[90%] h-full justify-between p-4 relative">
      <div className="flex flex-col gap-4 items-center mt-8">
        <div className="flex flex-col gap-2 items-center">
          <img src={CompletedImg} alt="Finished Wallet Setup Image" className="w-[150px] aspect-auto " />
          <h1 className="text-3xl text-white">You're all done!</h1>
          <p className="text-lg text-[#999]">
            You can now fully enjoy your wallet.
          </p>
        </div>
      </div>
      <button
        onClick={createAccount}
        className="w-full disabled:cursor-not-allowed bg-[#ab9ff2] disabled:bg-[#7e75b2] text-black rounded-lg hover: px-4 py-3"
      >
        <span className="">Get Started</span>
      </button>
    </div>
  );
};
