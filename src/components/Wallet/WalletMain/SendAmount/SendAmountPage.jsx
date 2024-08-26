import { CURRENCY, Images, WALLET_TYPES } from "../../../../constants";
import React, { useState } from "react";
import {
  useEthereumGetBalance,
  useSendEthereumMutation,
} from "../../../../hooks/ethereum";
import {
  useSendSolanaMutation,
  useSolanaGetBalance,
} from "../../../../hooks/solana";

import { HiAtSymbol } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { WalletDropdown } from "../../../../blocks";
import { splitPublicKey } from "../../../../utils";
import { useGetAccountsWithType } from "./useGetAccountsWithType";
import { useNavigateToPages } from "../../../../hooks";
import { useStore } from "../../../../store";

export const SendAmountPage = ({ wallet, toggleSidebar}) => {
  const walletsOfSameType = useGetAccountsWithType(wallet.type);

  const [selectedInternalWallet, setSelectedInternalWallet] = useState(null);

  const { data: solBalance } = useSolanaGetBalance(
    wallet.publicKey,
    wallet.type
  );

  const { data: ethBalance } = useEthereumGetBalance(
    wallet.publicKey,
    wallet.type
  );

  const balance = wallet.type === WALLET_TYPES.SOLANA ? solBalance : ethBalance;
  const sendSolsMutation = useSendSolanaMutation(toggleSidebar);
  const sendEthsMutation = useSendEthereumMutation(toggleSidebar);
  const [errors, setErrors] = useState({
    publicKey: null,
    amount: null,
  });

  const [amountObj, setAmountObj] = useState({
    publicKey: "",
    amount: "0.00",
  });

  const setMax = () => {
    setAmountObj((prev) => ({ ...prev, amount: balance }));
  };

  const validate = (name, value) => {
    switch (name) {
      case "amount":
        if (!value) {
          setErrors((prev) => ({ ...prev, amount: "Please enter amount" }));
        } else if (Number.isNaN(Number(value))) {
          setErrors((prev) => ({
            ...prev,
            amount: "Please enter valid amount",
          }));
        } else {
          value = parseFloat(+value);

          if (value > balance) {
            setErrors((prev) => ({ ...prev, amount: "Insufficient Balance" }));
          } else {
            setErrors((prev) => ({ ...prev, amount: null }));
          }
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmountObj((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const { navigateToNone } = useNavigateToPages();
  const {
    selectedWallet: { type: walletType },
  } = useStore((state) => state);

  const imageSrc = Images[walletType];
  const currency = CURRENCY[walletType];

  const sendAmount = () => {
    if (!amountObj.publicKey || !amountObj.amount) {
      alert("Please fill in the fields");
      return;
    }

    if (walletType === WALLET_TYPES.SOLANA) {
      sendSolsMutation.mutate(amountObj);
    } else if (walletType === WALLET_TYPES.ETHEREUM) {
      sendEthsMutation.mutate(amountObj);
    }
  };

  return (
    <div className="flex flex-col w-full items-center h-full pb-4">
      <div className="h-20 rounded-[50%] flex justify-center w-full">
        <img
          className="w-20 h-20 rounded-[50%]"
          src={imageSrc}
          alt={walletType}
        />
      </div>

      <div className="w-full p-4 flex flex-col gap-3 flex-1 relative px-2 py-3">
        <div className="bg-[#181818]  w-full rounded-lg flex items-center">
          <input
            type="text"
            name="publicKey"
            placeholder="Recipient's Address"
            className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500"
            value={amountObj.publicKey}
            hidden={!!selectedInternalWallet}
            onChange={handleChange}
          />
          {selectedInternalWallet && (
            <p className="bg-[#181818] px-2 py-3 w-full rounded-lg flex gap-2">
              {selectedInternalWallet?.name}
              <span className="text-gray-600">
                ({splitPublicKey(selectedInternalWallet?.publicKey).startHalf}
                ...
                {splitPublicKey(selectedInternalWallet?.publicKey).endHalf})
              </span>
            </p>
          )}
          <div className="w-8 h-8 font-bold  bg-[#ab9ff2] cursor-pointer text-black hover: grid place-items-center rounded-[50%]">
            {!selectedInternalWallet && (
              <>
                <WalletDropdown
                  wallets={walletsOfSameType}
                  onClick={(wallet) => {
                    setSelectedInternalWallet(wallet);
                    setAmountObj((prev) => ({
                      ...prev,
                      publicKey: wallet.publicKey,
                    }));
                  }}
                />
              </>
            )}
            {selectedInternalWallet && (
              <RxCross2
                onClick={() => {
                  setAmountObj((prev) => ({ ...prev, publicKey: "" }));
                  setSelectedInternalWallet(null);
                }}
              />
            )}
          </div>
        </div>
        {errors.publicKey && <p className="text-red-500">{errors.publicKey}</p>}
        <div className="bg-[#181818] px-2 py-3 w-full rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            className="bg-[#181818] px-2 py-3 w-full rounded-lg outline-none placeholder:text-gray-500"
            value={amountObj.amount}
            onChange={handleChange}
          />
          <div className="flex gap-2 items-center">
            <p className="text-[#333444]">{currency}</p>
            <p
              onClick={setMax}
              className="cursor-pointer px-2.5 py-1 bg-gray-500 rounded-full hover:bg-slate-600"
            >
              Max
            </p>
          </div>
        </div>
        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
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
          disabled={errors.amount || !amountObj.publicKey}
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
