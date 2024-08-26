import { CURRENCY, Images, WALLET_TYPES } from "../../../constants";
import React, { useEffect, useState } from "react";
import { convertToUsd, splitPublicKey } from "../../../utils";

import { BsCopy } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { useEthereumGetBalance } from "../../../hooks/ethereum";
import { useSolanaGetBalance } from "../../../hooks/solana";
import { useStore } from "../../../store";

export const WalletType = ({
  type = "SOLANA",
  publicKey,
  balanceInCurrency = false,
  balanceInDollar = 0.0,
  incrementAmount = 0.0,
  onClick = () => {},
  showDollar = true,
}) => {
  const [copied, setCopied] = useState(false);

  const imageSrc = Images[type];
  const currency = CURRENCY[type];

  const { data: solanaBalance } = useSolanaGetBalance(publicKey, type);
  const { data: ethereumBalance } = useEthereumGetBalance(publicKey, type);

  const balance =
    type === WALLET_TYPES.SOLANA ? solanaBalance : ethereumBalance;

  const [balanceInUSD, setBalanceInUSD] = useState(0);

  useEffect(() => {
    convertToUsd({
      [CURRENCY[type].toLowerCase()]: balance,
    }).then(({ ethUsdValue, solUsdValue }) => {
      setBalanceInUSD(
        type === WALLET_TYPES.ETHEREUM ? ethUsdValue : solUsdValue
      );
    });
  }, [type]);

  const { startHalf, endHalf } = splitPublicKey(publicKey);

  const next = () => {
    onClick();
  };

  return (
    <div
      onClick={next}
      className="flex justify-between bg-[#2a2a2a] items-center py-4 px-3 rounded-2xl cursor-pointer hover:bg-[#363636]"
    >
      <div className="flex gap-2 items-center">
        <img className="w-10 h-10 rounded-[50%]" src={imageSrc} alt={type} />
        <div className="flex flex-col">
          <p className="capitalize font-semibold text-white">
            {type.toLowerCase()}
          </p>
          {balanceInCurrency && (
            <p className="text-sm text-gray-500">
              {balance} {currency}
            </p>
          )}

          {publicKey && !balanceInCurrency && (
            <p className="text-sm text-gray-500">
              {copied ? "Copied" : startHalf + "..." + endHalf}
            </p>
          )}
        </div>
      </div>
      {publicKey && !showDollar && (
        <div className="bg-[#181818] h-8 w-8 rounded-[50%] grid place-items-center p-2">
          <IoCopyOutline
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          />
        </div>
      )}
      {showDollar && (
        <div className="">
          <p className="text-sm text-white">${balanceInUSD.toFixed(2)}</p>
          <p className="text-sm text-gray-500">${incrementAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};
