import React, { useEffect } from "react";

import { AiFillEyeInvisible } from "react-icons/ai";
import { generateMnemonic } from "bip39";
import { useState } from "react";
import { useWalletContext } from "../../context/WalletProvider";

export const SecretRecoveryPhase = ({ nextStep }) => {
  const { wallet, updateWallet } = useWalletContext();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const generateMnemonicAsync = async () => {
      const mnemonic = await generateMnemonic();
      updateWallet({
        mnemonic,
      });
    };

    generateMnemonicAsync();
  }, []);

  return (
    <div className="flex flex-col w-[90%] h-full justify-between p-4 relative">
      <div className="flex flex-col gap-4 items-center mt-8">
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-3xl text-white">Create a Password</h1>
          <p className="text-lg text-[#999]">
            You will use this to unloack wallet.
          </p>
        </div>
      </div>
      <div className="group relative">
        {wallet.mnemonic && (
          <div className="grid grid-cols-3 gap-2 blur-sm hover:blur-0">
            {wallet.mnemonic.split(" ").map((phrase, index) => {
              return (
                <div
                  key={crypto.randomUUID()}
                  className="bg-[#181818] px-2 text-sm py-2 rounded text-center text-white"
                >
                  <span className="text-gray-600">{index + 1}.</span> {phrase}
                </div>
              );
            })}
          </div>
        )}
        <div className="absolute top-0 left-0 h-full w-full group-hover:invisible flex items-center justify-center text-white">
          <AiFillEyeInvisible size={64} />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2 items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value={saved}
            onChange={() => setSaved(!saved)}
            className="w-4 h-4 text-blue-600 bg-[#222222] border-gray-300 rounded"
          />
          <span className="text-md text-gray-600">
            I saved my Secret Recover Phrase
          </span>
        </div>
        <button
          onClick={nextStep}
          disabled={!saved}
          className="w-full disabled:cursor-not-allowed bg-[#ab9ff2] disabled:bg-[#7e75b2] text-black rounded-lg hover: px-4 py-3"
        >
          <span className="">Continue</span>
        </button>
      </div>
    </div>
  );
};
