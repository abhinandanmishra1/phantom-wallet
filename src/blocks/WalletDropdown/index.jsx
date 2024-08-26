import React, { useState } from "react";

import { HiAtSymbol } from "react-icons/hi";
import { splitPublicKey } from "../../utils";

export const WalletDropdown = ({wallets, onClick}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <HiAtSymbol className="" onClick={toggleDropdown} />

      {open && (
        <div className="bg-[#181818] w-full top-[70px] left-0 rounded-lg max-h-64 min-h-32 overflow-auto absolute">
          {wallets?.length > 0 && (
            <div className="w-full rounded-lg  z-50">
              {wallets?.map((wallet) => {
                const { startHalf, endHalf } = splitPublicKey(wallet.publicKey);
                return (
                  <div
                    key={wallet.publicKey}
                    onClick={() => onClick(wallet)}
                    className="text-[#333444] p-4 hover:bg-black cursor-pointer text-lg flex justify-between"
                  >
                    <p className="text-white">{wallet.name}</p>
                    <p>
                      ({startHalf}...{endHalf})
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};
