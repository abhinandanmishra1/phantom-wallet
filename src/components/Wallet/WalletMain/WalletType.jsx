import { CURRENCY, Images } from "../../../constants";

import React from "react";
import { useStore } from "../../../store";

export const WalletType = ({
  type = "SOLANA",
  balanceInCurrency = 0,
  balanceInDollar = 0.0,
  incrementAmount = 0.0,
  onClick = () => {},
  showDollar = true,
}) => {
  const { setWalletType } = useStore(state => state)

  const imageSrc = Images[type];
  const currency = CURRENCY[type];

  const next = () => {
    onClick();
    setWalletType(type)
  }
  
  return (
    <div onClick={next} className="flex justify-between bg-[#2a2a2a] items-center py-4 px-3 rounded-2xl cursor-pointer hover:bg-[#363636]">
      <div className="flex gap-2 items-center">
        <img className="w-10 h-10 rounded-[50%]" src={imageSrc} alt={type} />
        <div className="flex flex-col">
          <p className="capitalize font-semibold text-white">
            {type.toLowerCase()}
          </p>
          <p className="text-sm text-gray-500">
            {balanceInCurrency} {currency}
          </p>
        </div>
      </div>
      {showDollar && (
        <div className="">
          <p className="text-sm text-white">${balanceInDollar.toFixed(2)}</p>
          <p className="text-sm text-gray-500">${incrementAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};
