import React, { useState } from "react";

export const Password = ({ nextStep }) => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(null);
  
  const onChange = (value, setFunc) => {
    setError(null);
    setFunc(value);
  }
  
  const next = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      nextStep();
    }
  }
  return (
    <div className="flex flex-col w-[90%] h-full justify-between p-4">
      <div className="flex flex-col gap-4 h-[50%] items-center mt-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-white">Create a Password</h1>
          <p className="text-lg text-[#999]">
            You will use this to unloack wallet.
          </p>
        </div>
        <input
          onChange={(e) => onChange(e.target.value, setPassword)}
          value={password}
          type="password"
          placeholder="Password"
          className="outline-none bg-[#181818] border-gray-600 placeholder-gray-600 text-white text-md rounded-lg block w-full px-2.5 py-3 "
        />
        <input
          onChange={(e) => onChange(e.target.value, setConfirmPassword)}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="outline-none bg-[#181818] border-gray-600 placeholder-gray-600 text-white text-md rounded-lg block w-full px-2.5 py-3 "
        />
        {
          error && <p className="text-lg text-red-700 self-start">
            {error}
          </p>
        }
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2 items-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value={checked}
            onChange={() => setChecked(!checked)}
            className="w-4 h-4 text-blue-600 bg-[#222222] border-gray-300 rounded"
          />
          <span className="text-md text-gray-600">
            I agree to the{" "}
            <a className="text-[#ab9ff2] cursor-pointer hover:underline">
              Terms of Service
            </a>
          </span>
        </div>
        <button
          onClick={next}
          disabled={!password || !confirmPassword || !checked}
          className="w-full disabled:cursor-not-allowed bg-[#ab9ff2] disabled:bg-[#7e75b2] text-black rounded-lg hover: px-4 py-3"
        >
          <span className="">Continue</span>
        </button>
      </div>
    </div>
  );
};
