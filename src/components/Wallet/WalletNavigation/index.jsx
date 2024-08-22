import { AiFillAppstore } from "react-icons/ai";
import { CiGlobe } from "react-icons/ci";
import { FaBolt } from "react-icons/fa";
import { HiCurrencyDollar } from "react-icons/hi";
import { IoSwapHorizontal } from "react-icons/io5";
import React from "react";

const NavIcon = ({ Icon, name, active, navigate }) => {
  return (
    <div className={`py-4 px-4 ${active === name && "border-t border-t-[#ab9ff2]"}`}>
      <Icon
        onClick={() => {
          navigate(name);
        }}
        size={28}
        className={` hover:text-white cursor-pointer ${
          active === name ? "text-white" : "text-[#484848]"
        }`}
      />
    </div>
  );
};

export const WallletNavigation = ({ active, navigate }) => {
  return (
    <div className="h-16 flex w-full items-center justify-between px-4 shadow-md bg-[#2c2c2c]">
      <NavIcon
        active={active}
        navigate={navigate}
        name="dashboard"
        Icon={HiCurrencyDollar}
      />
      <NavIcon
        active={active}
        navigate={navigate}
        name="collectibles"
        Icon={AiFillAppstore}
      />
      <NavIcon
        active={active}
        navigate={navigate}
        name="swap"
        Icon={IoSwapHorizontal}
      />
      <NavIcon
        active={active}
        navigate={navigate}
        name="activities"
        Icon={FaBolt}
      />
      <NavIcon
        active={active}
        navigate={navigate}
        name="global"
        Icon={CiGlobe}
      />
    </div>
  );
};
