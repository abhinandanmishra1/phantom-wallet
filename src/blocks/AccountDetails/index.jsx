import React, { useState } from "react";
import { SiEthereum, SiSolana } from "react-icons/si";

import { BsCopy } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { splitPublicKey } from "../../utils";
import { useWalletContext } from "../../context";

const Icons = {
  SOLANA: SiSolana,
  ETHEREUM: SiEthereum,
};

const WalletDetails = ({ type, publicKey }) => {
  const [copied, setCopied] = useState(false);

  const Icon = Icons[type];
  const { startHalf, endHalf} = splitPublicKey(publicKey);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
    setCopied(true);
  };

  return (
    <div key={publicKey} className="flex gap-2">
      <Icon size={16} />
      <p className="capitalize">{type.toLowerCase()}</p>
      {!copied && (
        <p
          className="flex items-center gap-1 cursor-pointer"
          onClick={copyToClipboard}
        >
          {startHalf}...{endHalf} <BsCopy />
        </p>
      )}

      {copied && <p className="flex items-center">Copied!</p>}
    </div>
  );
};

export const AccounDetails = ({ accountNumber, children, place = "top" }) => {
  const {
    wallet: { accounts },
  } = useWalletContext();

  const { wallets } = accounts[accountNumber];

  return (
    <>
      <div data-tooltip-id={`account-${accountNumber}`}>{children}</div>
      <Tooltip
        clickable
        className="group z-40"
        id={`account-${accountNumber}`}
        place={place}
      >
        <div className="hover:visible flex flex-col gap-2 bg-black p-4 rounded-lg min-w-[220px]">
          {wallets.map(({ type, publicKey }) => (
            <WalletDetails key={publicKey} publicKey={publicKey} type={type} />
          ))}
        </div>
      </Tooltip>
    </>
  );
};
