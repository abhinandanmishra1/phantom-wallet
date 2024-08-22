import EthereumIcon from "../../../assets/ethereum.avif";
import React from "react";
import SolanaIcon from "../../../assets/solana.avif";

const CURRENCY = {
  SOLANA: "SOL",
  ETHEREUM: "ETH",
};

export const WalletType = ({
  type = "SOLANA",
  balanceInCurrency = 0,
  balanceInDollar = 0.0,
  incrementAmount = 0.0,
}) => {
  const Images = {
    SOLANA: SolanaIcon,
    ETHEREUM: EthereumIcon,
  };

  const imageSrc = Images[type];
  const currency = CURRENCY[type];

  return (
    <div className="flex justify-between bg-[#2a2a2a] items-center py-4 px-3 rounded-2xl cursor-pointer hover:bg-[#363636]">
      <div className="flex gap-2 items-center">
        <img className="w-10 h-10 rounded-[50%]" src={imageSrc} alt={type} />
        <div className="flex flex-col">
          <p className="capitalize font-semibold text-white">{type.toLowerCase()}</p>
          <p className="text-sm text-gray-500">
            {balanceInCurrency} {currency}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-white">${balanceInDollar.toFixed(2)}</p>
        <p className="text-sm text-gray-500">${incrementAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};
