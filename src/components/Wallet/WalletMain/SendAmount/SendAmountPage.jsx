import { CURRENCY, Images, WALLET_TYPES } from "../../../../constants";
import React, { useState } from "react";

import { HiAtSymbol } from "react-icons/hi";
import { useNavigateToPages } from "../../../../hooks";
import { useSendEthereumMutation } from "../../../../hooks/ethereum";
import { useSendSolanaMutation } from "../../../../hooks/solana";
import { useStore } from "../../../../store";

export const SendAmountPage = ({ balance }) => {
  const sendSolsMutation = useSendSolanaMutation();
  const sendEthsMutation = useSendEthereumMutation();
  
  const { navigateToNone } = useNavigateToPages();
  const { selectedWallet: {
    type: walletType,
  } } = useStore((state) => state);
  
  const imageSrc = Images[walletType];
  const currency = CURRENCY[walletType];

  const [publicKey, setPublicKey] = useState(null);
  const [amount, setAmount] = useState(null);

  const sendAmount = () => {
    if (!publicKey || !amount) {
      alert("Please fill in the fields");
      return;
    }
    console.log({
      publicKey,
      amount,
    })
    
    if (walletType === WALLET_TYPES.SOLANA) {
      sendSolsMutation.mutate({
        publicKey,
        amount,
      });
    }else if(walletType === WALLET_TYPES.ETHEREUM) {
      sendEthsMutation.mutate({
        publicKey,
        amount,
      });
    }
  }

  return (
    <div className="flex flex-col w-full items-center h-full pb-4">
      <div className="h-20 rounded-[50%] flex justify-center w-full">
        <img
          className="w-20 h-20 rounded-[50%]"
          src={imageSrc}
          alt={walletType}
        />
      </div>

      <div className="w-full p-4 flex flex-col gap-3 flex-1">
        <div className="bg-[#181818] px-2 py-3 w-full rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Recipient's Address"
            className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
          />
          <div>
            <HiAtSymbol />
          </div>
        </div>
        <div className="bg-[#181818] px-2 py-3 w-full rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Amount"
            className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <p className="text-[#333444]">{currency}</p>
            <p className="px-2.5 py-1 bg-gray-500 rounded-full">Max</p>
          </div>
        </div>
      </div>
      {/* <div>
        <p></p>
        <p>
          Available {balance}
          {currency}
        </p>
      </div> */}
      <div className="h-18 flex flex-row-reverse gap-2 justify-center  w-full">
        <button
          onClick={sendAmount}
          disabled={!publicKey || !amount || amount > balance}
          className="w-[50%] bg-[#ab9ff2] text-black rounded-lg hover: px-4 py-4 disabled:opacity-45 disabled:cursor-not-allowed"
        >
          <span className="">Next</span>
        </button>
        <button
          onClick={navigateToNone}
          className="w-[50%] bg-[#333333] rounded-lg hover: px-4 py-4"
        >
          <span className="">Cancel</span>
        </button>
      </div>
    </div>
  );
};
