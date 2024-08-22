import { FiDollarSign, FiPlus, FiSend } from 'react-icons/fi';

import { MdSwapHoriz } from 'react-icons/md';
import React from 'react';

const ActionButton = ({ Icon, label }) => (
  <button className="flex items-center p-2 py-3 justify-center rounded-xl bg-[#2a2a2a] hover:bg-[#333] flex-col gap-1 w-32">
    <div>
      <Icon className="text-[#ab9ff2]" size={26} />
    </div>
    <span className='text-[#888] text-sm'>{label}</span>
  </button>
);

const WalletDashboard = ({
    balance = "0.00",
    incrementPercentage = "0.00",
    incrementBalance = "0.00"
}) => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col items-center p-4 gap-2 mt-4">
        <div className="text-white text-4xl font-semibold">${balance}</div>
        <div className="w-full flex justify-center gap-2 text-gray-400 items-center">
          <p>+${incrementBalance}</p>
          <p className='bg-[#343434] p-1 rounded-lg'>+{incrementPercentage}%</p>
        </div>
      </div>

      <div className="flex space-x-4 p-4">
        <ActionButton Icon={FiPlus} label="Receive" />
        <ActionButton Icon={FiSend} label="Send" />
        <ActionButton Icon={MdSwapHoriz} label="Swap" />
        <ActionButton Icon={FiDollarSign} label="Buy" />
      </div>
    </div>
  );
};

export default WalletDashboard;
